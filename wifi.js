const i = document.querySelector('img');
const s = document.querySelector('.ssid');
const p = document.querySelector('.password');
const b = document.querySelector('button');

function update() {
  const wifi = `WIFI:T:WPA;S:${s.value};P:${p.value};;`;
  i.src = `https://api.qrserver.com/v1/create-qr-code/?size=164x164&data=${wifi}`;
}
s.addEventListener(
  'keyup',
  update,
);

p.addEventListener(
  'keyup',
  update,
);

b.addEventListener(
  'click',
  () => {
    window.print();
  },
);
