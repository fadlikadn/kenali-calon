// const fetch = require('node-fetch')
const fs = require('node:fs')
const FormData = require('form-data')

async function postData(url = '', data = {}) {
  const form = new FormData()
  for (const key in data) {
    console.log(key, data[key])
    form.append(key, data[key])
  }
  const response = await fetch(url, {
    method: 'POST',
    body: form
  })
  fs.writeFileSync('response.html', await response.text())
  // console.log('response', response)
  // return response.json()
  return response
}

postData('https://infopemilu.kpu.go.id/Pemilu/Dct_dprd/profile', {
  'id_calon_dpr': '6cff3dbf6200aa057706c715b3072da99549ef65c8d60ff3a46440efce63347cbc1cbe0df007c3396b98834a79ff8a6c81935c8e618d925e1aadd3406e0b7379yGSKXKRuAZe9l8bypnT18uupjX+p5xIj5k9vzwtBcIA=',
  'logo_partai': 'berkas-sipol/parpol/profil/gambar_parpol/1657710596_Logo GERINDRA 10x10.png',
  'pilihan_publikasi': '',
  'status_publikasi': 'Bersedia'
})
  .then(data => {
    // console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
