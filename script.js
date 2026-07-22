
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('nav').classList.remove('open')));

document.querySelectorAll('[data-compare]').forEach(compare=>{
  const after=compare.querySelector('.after-wrap'),handle=compare.querySelector('.handle');
  const move=e=>{const r=compare.getBoundingClientRect();let x=((e.clientX-r.left)/r.width)*100;x=Math.max(0,Math.min(100,x));after.style.width=x+'%';handle.style.left=x+'%'};
  compare.addEventListener('pointerdown',e=>{compare.setPointerCapture(e.pointerId);move(e)});
  compare.addEventListener('pointermove',e=>{if(compare.hasPointerCapture(e.pointerId))move(e)});
});

const prices={car:120,truck:160,suv:160,other:160};
const addonPrices={stain:50,engine:40,hair:30};
function updateEstimate(){
  const v=document.getElementById('vehicle');
  if(!v)return;
  let total=prices[v.value]||0;
  document.querySelectorAll('input[name="addons"]:checked').forEach(x=>total+=addonPrices[x.value]||0);
  const plan=document.getElementById('plan');
  if(plan && plan.value==='monthly') total=Math.round(total*.85);
  if(plan && plan.value==='biweekly') total=Math.round(total*.80);
  document.getElementById('estimateTotal').textContent='$'+total;
}
document.querySelectorAll('#vehicle,input[name="addons"],#plan').forEach(el=>el.addEventListener('change',updateEstimate));
updateEstimate();

function sendBooking(e){
  e.preventDefault();
  const val=id=>document.getElementById(id)?.value||'';
  const addons=[...document.querySelectorAll('input[name="addons"]:checked')].map(x=>x.dataset.label).join(', ')||'None';
  const total=document.getElementById('estimateTotal').textContent;
  const message=`Hi Southern Shine, I would like to request an appointment.\n\nName: ${val('name')}\nPhone: ${val('phone')}\nEmail: ${val('email')}\nVehicle: ${val('vehicle')}\nPlan: ${val('plan')}\nAdd-ons: ${addons}\nPreferred date: ${val('date')}\nPreferred time: ${val('time')}\nService address: ${val('address')}\nEstimated price: ${total}\nNotes: ${val('notes')}`;
  location.href='sms:6016506984?&body='+encodeURIComponent(message);
}
