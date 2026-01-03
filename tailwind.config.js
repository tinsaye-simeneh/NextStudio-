/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Primary': "#EF5B2C",
        'Secondary': "#102540"
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      fontFamily:{
        Poppins: ['Poppins']
      }
    },
    screens: {
      'lg': {'max': '1344px'},
      
      'pds': {'max' : '1250px'},

      'tt': {'max' : '1180px'},

      'llg': {'max': '1150px'},

      'llg2': {'max' : '1090px'},

      'llgg': {'max' : '1012px'},
      
      "s3m" : {'max' : '980px'},

      'sm2':{'max': '966px'},

      'ssm2': {'max' : '948px'},
      
      'smm': {'max': '938px'},

      'mme3': {'max' : '926px'},

      'mme': {'max' : '950px'},

      'md2': {'max' : '885px'},

      'md': {'max': '859px'},

      'mmd': {'max' : '819px'},

      'tmd': {'max' : '800px'},

      'sm': {'max': '780px'},

      "nsm": {'max' : '760px'},

      "pds2" : {'max' : '720px'},
      
      'vsm': {'max': '699px'},

      'vs2': {'max': '617px'},

      'mme2' : {'max' : '590px'},

      'cvs2': {'max' : '576px'},

      'tvs' : {'max' : '601px'},

      'vvsm': {'max': '568px'},

      'mme5': {'max' : '530px'},
      
      'vsmm': {'max': '492px'},

      "vsm2": {'max': '480px'},

      "pds3": {'max' : '500px'},

      "csm": {'max' : '400px'},

      "msm" : { 'max' : '380px'}
    }
  },
  plugins: [],
}