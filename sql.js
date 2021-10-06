 const mysql = require('mysql2/promise');
 const {
     encode
 } = require('js-base64');
 //  直接数据库塞数据
 const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     database: 'blog',
     password: '',
     waitForConnections: true,
     connectionLimit: 10,
     dateStrings: true
 });
 //介绍
 //  文章内容
 let b = `PHA+5Zyo5pyA6L+R55qEdnVl5byA5Y+R5LitYWpheOW6k+mAieaLqeS6hmF4aW9z77yM6ZyA6KaB5qC55o2u5Zue6LCD5Ye95pWw55qE5Y+C5pWw5omn6KGM5LiA5Liq5b6I6ZW/55qE5Luj56CB5Z2X77yM5omn6KGM5Ye95pWw5Yqg5LiKYXhpb3Plj4LmlbDku6PnoIHph4/pnZ7luLjlpKfkuI3kvr/kuo7lkI7mnJ/nmoTkvJjljJblkozku6PnoIHnu7TmiqTvvIzkuo7mmK/miJHkuIrnvZHlr7vmsYJheGlvc+W8guatpeeahOaUvuazle+8jOiiq+WRiuefpWF4aW9z5pivcHJvbWlzZei/lOWbnuWAvOayoeacieWQjOatpe+8jOWmguaenOS7o+eggemHj+Wkp+WPr+S7peWwneivleiHquihjOWwgeijhe+8jOS6juaYr+eglOeptuS6hmFzeW5j5ZKMYXdhaXQ8L3A+PHA+RVM2UHJvbWlzZe+8mjwvcD48cHJlIHR5cGU9IkphdmFTY3JpcHQiPjxjb2RlPjxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPm5ldzwvc3Bhbj4gPHNwYW4gY2xhc3M9ImhsanMtYnVpbHRfaW4iPlByb21pc2U8L3NwYW4+KDxzcGFuIGNsYXNzPSJobGpzLWZ1bmN0aW9uIj48c3BhbiBjbGFzcz0iaGxqcy1rZXl3b3JkIj5mdW5jdGlvbjwvc3Bhbj4gKDxzcGFuIGNsYXNzPSJobGpzLXBhcmFtcyI+cmVzb2x2ZSwgcmVqZWN0PC9zcGFuPikgPC9zcGFuPnsKICAgIDxzcGFuIGNsYXNzPSJobGpzLWJ1aWx0X2luIj5jb25zb2xlPC9zcGFuPi5sb2coPHNwYW4gY2xhc3M9ImhsanMtbnVtYmVyIj4xMTExPC9zcGFuPik7CiAgICByZXNvbHZlKDxzcGFuIGNsYXNzPSJobGpzLW51bWJlciI+MjIyMjwvc3Bhbj4pOwp9KS50aGVuKDxzcGFuIGNsYXNzPSJobGpzLWZ1bmN0aW9uIj48c3BhbiBjbGFzcz0iaGxqcy1rZXl3b3JkIj5mdW5jdGlvbjwvc3Bhbj4gKDxzcGFuIGNsYXNzPSJobGpzLXBhcmFtcyI+dmFsdWU8L3NwYW4+KSA8L3NwYW4+ewogICAgPHNwYW4gY2xhc3M9ImhsanMtYnVpbHRfaW4iPmNvbnNvbGU8L3NwYW4+LmxvZyh2YWx1ZSk7CiAgICA8c3BhbiBjbGFzcz0iaGxqcy1rZXl3b3JkIj5yZXR1cm48L3NwYW4+IDxzcGFuIGNsYXNzPSJobGpzLW51bWJlciI+MzMzMzwvc3Bhbj47Cn0pPC9jb2RlPjwvcHJlPjxwPueUn+aIkOS4gOS4quW8guatpeWHveaVsOWmguaenOaJp+ihjOaIkOWKn+WwseaJp+ihjHRoZW7kuK3nmoTlh73mlbDlpoLmnpzlpLHotKXlsLHmiafooYxjYXRjaOS4reeahOWHveaVsDwvcD48cD48Yj5hc3luYzwvYj7lsLHmmK/lsIbkuIDkuKrmma7pgJrlh73mlbDov5Tlm57kuLpwcm9taXNl77yM5b2T54S25Zyo5a2m5LmgYXN5bmPlkoxhd2FpdOaXtuS9oOmcgOimgeWFiOS6huino3Byb21pc2XnmoTnlKjms5U8L3A+PHByZSB0eXBlPSJKYXZhU2NyaXB0Ij48Y29kZT4gICAgPHNwYW4gY2xhc3M9ImhsanMtdGFnIj4mbHQ7PHNwYW4gY2xhc3M9ImhsanMtbmFtZSI+c2NyaXB0PC9zcGFuPiZndDs8L3NwYW4+PHNwYW4gY2xhc3M9ImphdmFzY3JpcHQiPgogICAgICAgIDxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmFzeW5jPC9zcGFuPiA8c3BhbiBjbGFzcz0iaGxqcy1mdW5jdGlvbiI+PHNwYW4gY2xhc3M9ImhsanMta2V5d29yZCI+ZnVuY3Rpb248L3NwYW4+IDxzcGFuIGNsYXNzPSJobGpzLXRpdGxlIj50ZXN0PC9zcGFuPig8c3BhbiBjbGFzcz0iaGxqcy1wYXJhbXMiPjwvc3Bhbj4pIDwvc3Bhbj57CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPnJldHVybjwvc3Bhbj4gPHNwYW4gY2xhc3M9ImhsanMtc3RyaW5nIj4nYSc8L3NwYW4+CiAgICAgICAgfQogICAgICAgIHRlc3QoKS50aGVuKDxzcGFuIGNsYXNzPSJobGpzLWZ1bmN0aW9uIj48c3BhbiBjbGFzcz0iaGxqcy1wYXJhbXMiPnJlczwvc3Bhbj4gPSZndDs8L3NwYW4+IHsKICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImhsanMtYnVpbHRfaW4iPmNvbnNvbGU8L3NwYW4+LmxvZyhyZXMpOwogICAgICAgIH0pCiAgICA8L3NwYW4+PHNwYW4gY2xhc3M9ImhsanMtdGFnIj4mbHQ7LzxzcGFuIGNsYXNzPSJobGpzLW5hbWUiPnNjcmlwdDwvc3Bhbj4mZ3Q7PC9zcGFuPjwvY29kZT48L3ByZT48cD50ZXN05Ye95pWw5Yqg5LiKYXN5bmPkvJrooqvovazljJbkuLpwcm9taXNl5YW25Lit55qEcmV0dXJu6L+U5Zue5YC85bCx5pivdGhlbuWHveaVsOeahOWPguaVsDwvcD48cD48Yj5hd2FpdDwvYj7lj6rog73kvb/nlKjlnKhwcm9taXNl5Lit77yI5YyF5ousYXN5bmPnmoTov5Tlm57lh73mlbDvvInlhbbnlKjpgJTlkozku5bnmoTkuK3mloflkKvkuYnlt67kuI3lpJrvvJrnrYnlvoXvvIzmhI/mgJ3mmK/lv4XpobvnrYnliLDliqBhd2FpdOeahOWHveaVsOe7k+adn3Byb21pc2XmiY3kvJrnu6fnu63miafooYw8L3A+PHByZSB0eXBlPSJKYXZhU2NyaXB0Ij48Y29kZT48c3BhbiBjbGFzcz0iaGxqcy1rZXl3b3JkIj5pbXBvcnQ8L3NwYW4+IGF4aW9zIDxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmZyb208L3NwYW4+IDxzcGFuIGNsYXNzPSJobGpzLXN0cmluZyI+J2F4aW9zJzwvc3Bhbj47Cgo8c3BhbiBjbGFzcz0iaGxqcy1rZXl3b3JkIj5hc3luYzwvc3Bhbj4gPHNwYW4gY2xhc3M9ImhsanMtZnVuY3Rpb24iPjxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmZ1bmN0aW9uPC9zcGFuPiA8c3BhbiBjbGFzcz0iaGxqcy10aXRsZSI+Y3JlYXRlVHlwZTwvc3Bhbj4oPHNwYW4gY2xhc3M9ImhsanMtcGFyYW1zIj5nZXREYXRhPC9zcGFuPikgPC9zcGFuPnsKICAgIDxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmxldDwvc3Bhbj4gZGF0YTsKICAgIDxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmF3YWl0PC9zcGFuPiBheGlvcyh7CiAgICAgICAgPHNwYW4gY2xhc3M9ImhsanMtYXR0ciI+bWV0aG9kPC9zcGFuPjogPHNwYW4gY2xhc3M9ImhsanMtc3RyaW5nIj4iUE9TVCI8L3NwYW4+LAogICAgICAgIDxzcGFuIGNsYXNzPSJobGpzLWF0dHIiPnVybDwvc3Bhbj46IDxzcGFuIGNsYXNzPSJobGpzLXN0cmluZyI+Jy9jcmVhdGUtdHlwZSc8L3NwYW4+LAogICAgICAgIDxzcGFuIGNsYXNzPSJobGpzLWF0dHIiPmRhdGE8L3NwYW4+OiB7CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJobGpzLWF0dHIiPnR5cGU8L3NwYW4+OiBnZXREYXRhLnR5cGUKICAgICAgICB9CiAgICB9KS50aGVuKDxzcGFuIGNsYXNzPSJobGpzLWZ1bmN0aW9uIj48c3BhbiBjbGFzcz0iaGxqcy1wYXJhbXMiPnJlczwvc3Bhbj4gPSZndDs8L3NwYW4+IHsKICAgICAgICBkYXRhID0gcmVzLmRhdGE7CiAgICB9KQogICAgPHNwYW4gY2xhc3M9ImhsanMta2V5d29yZCI+cmV0dXJuPC9zcGFuPiBkYXRhOwp9CjxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmV4cG9ydDwvc3Bhbj4gPHNwYW4gY2xhc3M9ImhsanMta2V5d29yZCI+ZGVmYXVsdDwvc3Bhbj4gY3JlYXRlVHlwZTs8L2NvZGU+PC9wcmU+PG9sPjxsaT7lvJXlhaVheGlvc+WwhjwvbGk+PGxpPmNyZWF0ZVR5cGXovazljJbkuLpwcm9taXNlPGJyPjwvbGk+PGxpPuiuvue9ruWPmOmHj2RhdGHlh4blpIfkvZzkuLrov5Tlm57lgLw8L2xpPjxsaT7kuLpheGlvc+WHveaVsOa3u+WKoGF3YWl0562J5b6FYXhpb3PlrozlhajmiafooYzlroxjcmVhdGVUeXBl5omN5Lya6L+U5ZueZGF0YeWPmOmHjzwvbGk+PGxpPuivt+axguaIkOWKn+WQjuWwhmF4aW9z55qE6K+35rGC5YC86LWL5YC857uZ5Y+Y6YePZGF0YTwvbGk+PGxpPuWwhuaVtOS4quWHveaVsOWvvOWHuuaWueS+v+WkjeeUqDwvbGk+PC9vbD48cD48Yj7pobnnm67lr7zlhaXlh73mlbA8L2I+PC9wPjxwcmUgdHlwZT0iSmF2YVNjcmlwdCI+PGRpdiBjbGFzcz0iY29kZS10aXRsZSI+SmF2YVNjcmlwdDwvZGl2Pjxjb2RlPjxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmltcG9ydDwvc3Bhbj4gY3JlYXRlSHRtbCA8c3BhbiBjbGFzcz0iaGxqcy1rZXl3b3JkIj5mcm9tPC9zcGFuPiA8c3BhbiBjbGFzcz0iaGxqcy1zdHJpbmciPiJAL21vZHVsZXMvZnVuY3Rpb24vY3JlYXRlSHRtbCI8L3NwYW4+Owo8c3BhbiBjbGFzcz0iaGxqcy1rZXl3b3JkIj5pbXBvcnQ8L3NwYW4+IHVwZGF0YUh0bWwgPHNwYW4gY2xhc3M9ImhsanMta2V5d29yZCI+ZnJvbTwvc3Bhbj4gPHNwYW4gY2xhc3M9ImhsanMtc3RyaW5nIj4iQC9tb2R1bGVzL2Z1bmN0aW9uL3VwZGF0YUh0bWwuanMiPC9zcGFuPjsKPHNwYW4gY2xhc3M9ImhsanMta2V5d29yZCI+aW1wb3J0PC9zcGFuPiB1cGRhdGFBcnRpY2xlIDxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPmZyb208L3NwYW4+IDxzcGFuIGNsYXNzPSJobGpzLXN0cmluZyI+IkAvbW9kdWxlcy9hcnRpY2xlL3VwZGF0YS1hcnRpY2xlIjwvc3Bhbj47PC9jb2RlPjwvcHJlPjxwPjxiPmFqYXjlh73mlbDkvb/nlKg8L2I+PC9wPjxwcmUgdHlwZT0iSmF2YVNjcmlwdCI+PGNvZGU+ICBjcmVhdGVUeXBlKHsgPHNwYW4gY2xhc3M9ImhsanMta2V5d29yZCI+dHlwZTwvc3Bhbj46IDxzcGFuIGNsYXNzPSJobGpzLWtleXdvcmQiPnR5cGU8L3NwYW4+LnZhbHVlIH0pLnRoZW4oKHJlcykgPSZndDsgewoKCiAgfSk7PC9jb2RlPjwvcHJlPjxwPiEhOuWHveaVsOWGheWvueixoeS4uuato+W4uOeahOWHveaVsOS8oOWPgjwvcD4=`;
 console.time('timer')
 //  for (let index = 0; index < 1000; index++) {
 let index = 0
 setInterval(() => {
     let a = encode(`${index}`)
     let sql = `INSERT INTO article (router, type,title, introduce, article, isTop, isShow, time)
          VALUES
              ('${index}', 'Vue,React','${a}', '介绍${a}', '${b}', ${true}, ${true}, NOW())`
     pool.query(sql)
     index++
     console.log(index);
 }, 2000);
 //  }
 //  console.timeEnd('timer')