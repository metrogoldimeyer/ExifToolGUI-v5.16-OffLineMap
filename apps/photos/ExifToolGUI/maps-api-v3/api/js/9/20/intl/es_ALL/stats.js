/*
 * 20240303 - mgm
 *
 * /maps/gen_204 -> maps-api-v3/api/gen_204
 *
 */
google.maps.__gjsload__('stats', '\'use strict\';function ey(a,b,c){var d=[];Fd(a,function(a,c){d[B](a+b+c)});return d[Lc](c)}function fy(a,b){this.B={};this.f={};this.I=a+"/csi";this.d=b||"";this.T=El+"maps-api-v3/api/gen_204"}fy[F].l=0;fy[F].e=function(a,b,c){if(kh&&!this.B[a]){this.B[a]=j;var b=b.b,d=[this.I];d[B]("?v=2&s=","mapsapi3","&action=",a,"&rt=");var e=[];L(b,function(a){e[B](a[0]+"."+a[1])});I(e)&&d[B](e[Lc](","));Fd(c,function(a,b){d[B]("&"+ca(a)+"="+ca(b))});this.d&&d[B]("&e="+ca(this.d));gy(this,d[Lc](""))}};\nfunction gy(a,b){var c=new Image,d=a.l++;a.f[d]=c;ka(c,Ma(c,function(){ka(c,Ma(c,Qd));delete a.f[d]}));m[Hb](function(){c.src=b},1E3)}fy[F].b=function(a,b){var c=b||{},d=Wd()[Fb](36);c.src="apiv3";c.ts=d[Cb](d[E]-6);var e={};Fd(c,function(a,b){var c=ca(a),d=ca(b)[eb](/%7C/g,"|");e[c]=d});c=ey(e,":",",");a.cad=c;c=ey(a,"=","&");gy(this,this.T+"?"+c)};fy[F].j=function(a){gy(this,a)};function hy(a){this.B=a;this.f={};this.b=[]}hy[F].e=function(a){this.f[a]||(this.f[a]=j,this.b[B](a),2>this.b[E]&&zl(this,this.d,500))};hy[F].d=function(){for(var a={host:ea[Mb]&&ea[Mb].host||m[Mb].host},b=0,c;c=this.b[b];++b)a[c]="1";Va(this.b,0);this.B.b({ev:"api_mapft"},a)};function iy(a,b,c,d){this.b=a;R[u](this.b,Mf,this,this.e);R[u](this.b,Nf,this,this.e);this.B=b;this.I=c;this.j=d;this.d=0;this.f={};this.e()}iy[F].e=function(){for(var a;a=this.b[xb](0);){var b=a.vi;a=a.timestamp-this.I;++this.d;this.f[b]||(this.f[b]=0);++this.f[b];20<=this.d&&!(this.d%5)&&this.B({ev:"api_services"},{s:b,sr:this.f[b],tr:this.d,te:a,hc:this.j?"1":"0"})}};function jy(){this.b={}}jy[F].X=function(a){var a=Gf(a),b=this.b;a in b||(b[a]=0);++b[a]};va(jy[F],function(a){var a=Gf(a),b=this.b;a in b&&(--b[a],b[a]||delete b[a])});jy[F].count=function(a){return this.b[Gf(a)]||0};function ky(){this.b=[];this.f=[]};function ly(a,b,c){this.za=a;this.b=b;this.f=c}Ja(ly[F],function(a){return!!this.b.count(a)});function my(a,b,c,d){this.A=new ly(new ky,new jy,100);this.n=a;this.e=b;this.b=[];this.J=c;this.C=d;R[u](this.e,$e,this,this.d);Nq(this.e)&&this.d();this.j=0}J(my,V);\nmy[F].d=function(){var a=this.get("bounds");if(!this.get("projection")||!a||!this.Df)zl(this,this.d,1E3);else{var b={};this.e[sb](N(this,function(c){if(c){var d=c.rawData;if(0==(""+d.layer)[jc](this.Df[Cb](0,5))&&d[pk])for(var c=d.id[E],e=fs(d.id),d=d[pk],f=0,g;g=d[f];f++){var w=g.id,z;a:{z=g;if(!z.latLngCached){var D=z.a;if(!D){z=k;break a}var G=new T(D[0],D[1]),D=e,G=[G.x,G.y],O=(1<<c)/8388608;G[0]/=O;G[1]/=O;G[0]+=D.F;G[1]+=D.D;G[0]/=8388608;G[1]/=8388608;D=new T(G[0],G[1]);G=this.get("projection");\nz.latLngCached=G&&G[vj](D)}z=z.latLngCached}z&&a[Xb](z)&&(b[w]=g)}}}));var c=this.A,d;for(d in b)if(!c[Xb](d)){this.b[B](b[d]);var e=c,f=d;e.za.b[B](f);e.b.X(f);if(e.za.b[E]+e.za.f[E]>e.f){var g=e.za,f=g.f,g=g.b;if(!f[E])for(;g[E];)f[B](g.pop());(f=f.pop())&&e.b[pb](f)}}!this.j&&this.b[E]&&(this.j=zl(this,this.l,0))}};\nmy[F].l=function(){this.j=0;if(this.b[E]){var a=[],b=[],c=-1;this.b[sk]();for(var d=0,e=this.b[E];d<e;++d){var f=this.J(this.b[d]);1800<c+f[E]+1&&(a[B](b[Lc](",")),b=[],c=-1);b[B](f);c+=f[E]+1}a[B](b[Lc](","));b="&z="+this.get("zoom");for(d=0;d<a[E];++d)c={imp:ca(this.n+"="+a[d]+b)[eb](/%7C/g,"|")[eb](/%2C/g,",")},this.C(c);Va(this.b,0)}};my[F].mapType_changed=function(){var a=this.get("mapType");this.Df=a&&a.dd};wp(my[F],function(){this.d()});function ny(){var a;Do[15]&&(a=Ck(Lg));var b=Kg(Lg).b[7];this.b=new fy(b!=k?b:"",a);new iy(Ph,N(this.b,this.b.b),Qh,!!a);this.f={}}\nfunction oy(a){var b=a.id,a=10,c=b.match(/0x[0-9a-f]+:0x([0-9a-f]+)/);c&&(b=c[1],a=16);for(var d=b,b=a,c=[],a=d[E]-1;0<=a;--a)c[B](Di(d[a],b));d=[];for(a=c[E]-1;0<=a;--a){for(var e=0,f=0,g=d[E];f<g;++f){var h=d[f],h=h*b+e,i=h&63,e=h>>6;d[f]=i}for(;e;++f)i=e&63,d[f]=i,e>>=6;e=c[a];for(f=0;e;++f)f>=d[E]&&d[B](0),h=d[f],h+=e,i=h&63,e=h>>6,d[f]=i}if(0==d[E])a="A";else{b=fa(d[E]);for(a=d[E]-1;0<=a;--a)b[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_."[lb](d[a]);b.reverse();a=b[Lc]("")}return a}\nny[F].d=function(a,b){var c=new my("smimps",b,oy,N(this.b,this.b.b));c[q]("mapType",a.N());c[q]("zoom",a);c[q]("bounds",a);c[q]("projection",a)};ny[F].e=function(a){a=Gf(a);this.f[a]||(this.f[a]=new hy(this.b));return this.f[a]};var py=new ny;mf[Oe]=function(a){eval(a)};pf(Oe,py);\n')