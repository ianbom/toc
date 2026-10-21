import base64
import json
import os
import time
from pathlib import Path

root=Path.cwd()
out=root/'artifacts/qa'
out.mkdir(parents=True,exist_ok=True)
origin=os.environ.get('QA_ORIGIN','http://127.0.0.1:3127')
routes=json.loads((out/'routes.json').read_text(encoding='utf-8'))['results']
target=new_tab(origin+'/')
print('QA_TARGET',target,flush=True)
wait_for_load()
session=cdp('Target.attachToTarget',targetId=target,flatten=True)['sessionId']
cdp('Page.enable',session_id=session)
cdp('Page.bringToFront',session_id=session)
cdp('Page.addScriptToEvaluateOnNewDocument',session_id=session,source="window.__qaErrors=[];addEventListener('error',e=>{if(e.message)window.__qaErrors.push(e.message)});addEventListener('unhandledrejection',e=>window.__qaErrors.push(String(e.reason)));const original=console.error;console.error=(...args)=>{window.__qaErrors.push(args.map(String).join(' '));original(...args)};")

def evaluate(expression):
    result=cdp('Runtime.evaluate',session_id=session,expression=expression,returnByValue=True,awaitPromise=True)
    assert 'exceptionDetails' not in result,result.get('exceptionDetails')
    return result['result'].get('value')

def viewport(width,height):
    cdp('Emulation.setDeviceMetricsOverride',session_id=session,width=width,height=height,deviceScaleFactor=1,mobile=False)

def visit(path):
    cdp('Page.bringToFront',session_id=session)
    cdp('Page.navigate',session_id=session,url=origin+path)
    wait_for_load()
    for attempt in range(40):
        if evaluate('document.readyState')=='complete':
            break
        time.sleep(.1)
    evaluate('document.fonts.ready.then(()=>true)')
    time.sleep(.15)

def capture(name,full=False):
    params={'format':'png','captureBeyondViewport':full}
    if full:
        params['clip']={'x':0,'y':0,'width':evaluate('innerWidth'),'height':evaluate('document.documentElement.scrollHeight'),'scale':.5}
    image=cdp('Page.captureScreenshot',session_id=session,**params)
    (out/name).write_bytes(base64.b64decode(image['data']))

results=[]
for route in ([] if os.environ.get('QA_INTERACTIONS_ONLY') else routes):
    path=route['path']
    name=path.strip('/').replace('/','-') or 'home'
    for width,height in [(1440,900),(1280,900),(768,1024),(390,844),(375,812)]:
        viewport(width,height)
        visit(path)
        total=int(evaluate('document.documentElement.scrollHeight'))
        for offset in range(0,total,700):
            evaluate(f'window.scrollTo({{top:{offset},behavior:"instant"}});true')
            time.sleep(.035)
        evaluate("[...document.images].forEach(i=>i.loading='eager');true")
        time.sleep(.15)
        evaluate("Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>false))),new Promise(r=>setTimeout(r,3500))]).then(()=>true)")
        evaluate('window.scrollTo({top:0,behavior:"instant"});true')
        time.sleep(.7)
        record=json.loads(evaluate("JSON.stringify({url:location.pathname,width:innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,h1:document.querySelectorAll('h1').length,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.currentSrc),altMissing:[...document.images].filter(i=>!i.hasAttribute('alt')).length,emptyButtons:[...document.querySelectorAll('button')].filter(e=>e.getBoundingClientRect().width>0&&!e.getAttribute('aria-label')&&!e.innerText.trim()).length,errors:window.__qaErrors||[],hero:document.querySelector('.home-hero')?{height:document.querySelector('.home-hero').getBoundingClientRect().height,heading:document.querySelector('h1').getBoundingClientRect().toJSON(),font:getComputedStyle(document.querySelector('h1')).font}:null})"))
        assert record['url']==path,(path,record['url'])
        assert record['scrollWidth']<=record['clientWidth']+1,(path,width,'overflow',record)
        assert record['h1']==1,(path,'heading hierarchy')
        assert not record['images'],(path,width,'broken images',record['images'])
        assert not record['altMissing'],(path,'missing alt')
        assert not record['emptyButtons'],(path,'unnamed buttons')
        assert not record['errors'],(path,width,record['errors'])
        capture(f'{name}-{width}-top.png')
        if width in (1440,390):
            capture(f'{name}-{width}-full.png',True)
        results.append(record)
        (out/'responsive.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
        print('PASS',path,width,record['height'],flush=True)

def click_name(name,role=None):
    nodes=cdp('Accessibility.getFullAXTree',session_id=session)['nodes']
    normalized=' '.join(name.split()).casefold()
    matches=[node for node in nodes if ' '.join(str(node.get('name',{}).get('value','')).split()).casefold()==normalized and (role is None or node.get('role',{}).get('value')==role) and node.get('backendDOMNodeId')]
    assert matches,('Missing accessible control',name,role)
    node=matches[0]['backendDOMNodeId']
    cdp('DOM.scrollIntoViewIfNeeded',session_id=session,backendNodeId=node)
    time.sleep(.12)
    quad=cdp('DOM.getBoxModel',session_id=session,backendNodeId=node)['model']['content']
    x=sum(quad[0::2])/4
    y=sum(quad[1::2])/4
    cdp('Input.dispatchMouseEvent',session_id=session,type='mousePressed',x=x,y=y,button='left',clickCount=1)
    cdp('Input.dispatchMouseEvent',session_id=session,type='mouseReleased',x=x,y=y,button='left',clickCount=1)
    time.sleep(.35)

def key(name,code,virtual):
    for action in ['keyDown','keyUp']:
        cdp('Input.dispatchKeyEvent',session_id=session,type=action,key=name,code=code,windowsVirtualKeyCode=virtual)
    time.sleep(.3)

checks=[]
viewport(1440,900)
visit('/produk')
click_name('Medis','button')
assert evaluate('document.querySelectorAll(".product-grid .product-card").length')==1
assert evaluate('document.querySelector(".product-grid").innerText.includes("Peralatan Medis")')
click_name('Semua','button')
assert evaluate('document.querySelectorAll(".product-grid .product-card").length')==4
checks.append('product filtering and reset')
visit('/artikel')
click_name('Kesehatan','button')
assert evaluate('document.querySelectorAll(".article-list-item").length')==1
click_name('Semua','button')
assert evaluate('document.querySelectorAll(".article-list-item").length')==3
checks.append('article category filtering and reset')
visit('/')
click_name('Bidang peralatan apa yang ditangani TOC?','button')
assert evaluate('document.querySelector("[data-slot=accordion-trigger][data-state=open]")!==null')
click_name('Bidang peralatan apa yang ditangani TOC?','button')
assert evaluate('document.querySelector("[data-slot=accordion-trigger][data-state=open]")===null')
click_name('Instalasi dan Pelatihan','tab')
assert evaluate('document.querySelector("[role=tabpanel][data-state=active]").innerText.includes("Apakah TOC menyediakan instalasi")')
key('ArrowDown','ArrowDown',40)
assert evaluate('document.querySelector("[role=tab][aria-selected=true]").innerText.includes("Maintenance")')
checks.append('FAQ open, close, categories and keyboard navigation')
click_name('Makassar','button')
assert evaluate('document.querySelector(".branch-selected strong").innerText')=='Makassar'
checks.append('branch selection')
before=evaluate('document.querySelector(".trust-panel h3").innerText')
click_name('Sektor selanjutnya','button')
assert evaluate('document.querySelector(".trust-panel h3").innerText')!=before
checks.append('sector carousel')
viewport(390,844)
visit('/')
click_name('Produk selanjutnya','button')
time.sleep(.4)
assert evaluate('document.querySelector(".product-track").scrollLeft')>100
checks.append('mobile product carousel')
click_name('Buka menu navigasi','button')
assert evaluate('document.querySelector("[role=dialog]")!==null')
assert evaluate('document.activeElement.closest("[role=dialog]")!==null')
for step in range(12):
    key('Tab','Tab',9)
    assert evaluate('document.activeElement.closest("[role=dialog]")!==null')
capture('mobile-menu-open.png')
key('Escape','Escape',27)
assert evaluate('document.querySelector("[role=dialog]")===null')
assert evaluate('document.activeElement.getAttribute("aria-label")')=='Buka menu navigasi'
checks.append('mobile drawer open, focus trap, Escape and focus restoration')
click_name('Buka menu navigasi','button')
click_name('Tentang','link')
time.sleep(.4)
assert evaluate('location.pathname')=='/tentang'
assert evaluate('document.querySelector("[role=dialog]")===null')
checks.append('mobile navigation changes route and closes drawer')
viewport(1440,900)
visit('/kontak')
click_name('Siapkan Email','button')
assert evaluate('document.querySelectorAll(".field-error").length')==5
assert evaluate('document.activeElement.id')=='company'
checks.append('contact required validation and focus')
for field,value in [('Nama Perusahaan/Institusi','Institusi Contoh'),('Nama Penanggung Jawab','Nama Kontak'),('Nomor Telepon','081212345678'),('Email','invalid'),('Jelaskan Kebutuhan Anda','Konsultasi peralatan')]:
    click_name(field,'textbox')
    cdp('Input.insertText',session_id=session,text=value)
click_name('Siapkan Email','button')
assert evaluate('document.querySelectorAll(".field-error").length')==1
assert evaluate('document.activeElement.id')=='email'
checks.append('contact invalid email validation; no external application opened')
cdp('Emulation.setEmulatedMedia',session_id=session,features=[{'name':'prefers-reduced-motion','value':'reduce'}])
visit('/')
assert evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches')
assert evaluate('parseFloat(getComputedStyle(document.querySelector(".action-link")).transitionDuration)<=.001')
assert not evaluate('window.__qaErrors.length')
checks.append('reduced-motion preference')
cdp('Emulation.setEmulatedMedia',session_id=session,features=[])
(out/'interactions.json').write_text(json.dumps({'passed':checks,'externalEmailDelivery':'Not attempted: unit-tested mailto generation; no email sent.'},indent=2),encoding='utf-8')
print('INTERACTIONS',len(checks),'passed',flush=True)
print('LOCAL_TARGET',target,flush=True)
