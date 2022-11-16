import useScript from "@hooks/useScript";

const Ads = {
  SocialBar: function () {
    useScript({
      url: "//pl17917006.highperformancecpmgate.com/5f/07/e2/5f07e2967fa096ccf2eaeb77f517ab9b.js",
      disableOnDevelopment: true,
    });
  },
  NativeBanner: function () {
    useScript({
      url: "//pl17917328.highperformancecpmgate.com/b660ec7b99553839c4654ee4a1292d71/invoke.js",
      useAsync: true,
      cfasync: false,
      disableOnDevelopment: true,
    });
  },
  VignetteBanner: function () {
    useScript({
      useAsync: undefined,
      cfasync: undefined,
      innerHTML:
        "(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('glizauvo.net',5523309,document.createElement('script'))",
      disableOnDevelopment: true,
    });
  },
};
/* <script>(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('glizauvo.net',5523309,document.createElement('script'))</script> */

export default Ads;
