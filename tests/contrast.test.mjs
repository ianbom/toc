import test from 'node:test';
import assert from 'node:assert/strict';

function luminance(hex){
  const channels=hex.match(/[a-f\d]{2}/gi).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
}
function contrast(first,second){const values=[luminance(first),luminance(second)].sort((left,right)=>right-left);return (values[0]+.05)/(values[1]+.05);}

test('text tokens and conservative photo-overlay backgrounds meet AA contrast',()=>{
  for(const [foreground,background] of [['343434','ffffff'],['686868','ffffff'],['606060','eeeeee'],['85251a','ffffff'],['85251a','eeeeee'],['ffffff','85251a'],['ffffff','707070'],['ffffff','666666'],['ffffff','646464']])assert.ok(contrast(foreground,background)>=4.5,`${foreground}/${background}`);
  assert.ok(contrast('ffffff','8c8c8c')>=3,'Large heading over the contact image overlay');
  assert.ok(contrast('c9733b','ffffff')>=3,'Visible keyboard focus indicator');
});
