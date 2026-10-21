import base64
import json
import time
from pathlib import Path

out = Path('E:/Webgrow/TOC/artifacts/reference')
out.mkdir(parents=True, exist_ok=True)
pages = {
    'home': '5FAE21DD9FE826567F3893E653342073',
    'about': '1E83B25895D8A2A5DC070CAA48B663E8',
    'products': '2D3B7502FFB7C76BA848CCE02CC8CDE7',
    'product': '584B79FCF9B1D1AD221E06810BB6042F',
    'articles': '5EF918737426AAA22297FF09B7890EDE',
    'article': '22F12244CE9C01909B2DD2A97CD1FD04',
    'contact': '8DDC02FDB96ACCBDD7F237C4EF8AFB80',
}
measure = """JSON.stringify({url:location.href,width:innerWidth,height:document.documentElement.scrollHeight,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {text:e.textContent.trim(),x:r.x,y:r.y+scrollY,w:r.width,h:r.height,font:s.font}}),sections:[...document.querySelectorAll('main > *, .elementor > .e-con, .elementor > section')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {id:e.getAttribute('data-id'),y:r.y+scrollY,w:r.width,h:r.height,bg:s.backgroundColor,padding:s.padding,gap:s.gap}}),text:document.body.innerText})"""
records = {}
for name, target in pages.items():
    session = cdp('Target.attachToTarget', targetId=target, flatten=True)['sessionId']
    cdp('Page.bringToFront', session_id=session)
    records[name] = {}
    for width, height in [(1440,900),(1280,900),(768,1024),(390,844),(375,812)]:
        cdp('Emulation.setDeviceMetricsOverride', session_id=session, width=width, height=height, deviceScaleFactor=1, mobile=False)
        js('window.scrollTo(0,0);true', target_id=target)
        time.sleep(.1)
        total = int(js('document.documentElement.scrollHeight', target_id=target))
        for offset in range(0,total,700):
            js(f'window.scrollTo(0,{offset});true', target_id=target)
            time.sleep(.04)
        js('window.scrollTo(0,0);true', target_id=target)
        time.sleep(.3)
        records[name][str(width)] = json.loads(js(measure, target_id=target))
        result = cdp('Page.captureScreenshot', session_id=session, format='png', captureBeyondViewport=False)
        (out / f'{name}-{width}-top.png').write_bytes(base64.b64decode(result['data']))
        if width in (1440,390):
            result = cdp('Page.captureScreenshot',session_id=session,format='png',captureBeyondViewport=True,clip={'x':0,'y':0,'width':width,'height':total,'scale':.5})
            (out / f'{name}-{width}-full.png').write_bytes(base64.b64decode(result['data']))
        print(name,width,total,flush=True)
    (out / 'measurements.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print('Reference audit captured',flush=True)
