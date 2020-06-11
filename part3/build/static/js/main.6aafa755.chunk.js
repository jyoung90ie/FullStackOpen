(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),u=t.n(o),c=t(4),l=t(2),i=t(3),m=t.n(i),f="http://localhost:3001/api/persons",s=function(){return m.a.get(f).then((function(e){return e.data})).catch((function(e){return console.log("error retrieving data from persons",e)}))},d=function(e){return m.a.post(f,e).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return e}))},b=function(e,n){return m.a.patch("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.searchTerm,t=e.handleSearchChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},p=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,o=e.handleNameChange,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.data,t=e.deletePerson;return n.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))}))},g=function(e){var n=e.message,t=e.type;if(null===n)return null;var a="messages ".concat(t);return r.a.createElement("div",{className:a},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],f=i[1],w=Object(a.useState)(""),O=Object(l.a)(w,2),j=O[0],C=O[1],y=Object(a.useState)(""),k=Object(l.a)(y,2),N=k[0],S=k[1],P=Object(a.useState)(null),L=Object(l.a)(P,2),T=L[0],x=L[1],D=Object(a.useState)(null),I=Object(l.a)(D,2),J=I[0],A=I[1];Object(a.useEffect)((function(){s().then((function(e){return o(e)}))}),[]);var B=function(e){x(e),setTimeout((function(){return x(null)}),5e3)},W=function(e){A(e),setTimeout((function(){return A(null)}),5e3)},Y=t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(g,{message:J,type:"error"}),r.a.createElement(g,{message:T,type:"feedback"}),r.a.createElement(v,{searchTerm:N,handleSearchChange:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(p,{addPerson:function(e){if(e.preventDefault(),""===m||""===j)return alert("You must provide values for name and number"),null;var n=t.map((function(e){return e.name.toLowerCase()})),a=m.toLowerCase();if(n.includes(a)){if(!window.confirm("".concat(m," is already part of the phonebook. Would you like to replace the existing number with a the one provided?")))return null;var r=t.filter((function(e){return e.name.toLowerCase()===a}))[0],u=r.id,l=Object(c.a)(Object(c.a)({},r),{},{number:j});return b(u,l).then((function(e){var n=t.map((function(n){return n.id===u?e:n}));o(n),B("Phone number for ".concat(e.name," has been updated.")),f(""),C("")})).catch((function(e){W(e.response.data.error)})),null}var i={name:m,number:j};d(i).then((function(e){o(t.concat(e)),B("Added new entry for ".concat(i.name)),f(""),C("")})).catch((function(e){W(e.response.data.error)}))},newName:m,newNumber:j,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(E,{data:Y,deletePerson:function(e){var n=t.map((function(e){return e.id})).indexOf(e);if(!window.confirm("Do you want to delete ".concat(t[n].name,"?")))return null;h(e).then((function(a){o(t.filter((function(n){return n.id!==e}))),B("Information for ".concat(t[n].name," has been removed from the server."))})).catch((function(a){W("The entry for ".concat(t[n].name," has already been removed from the server.")),o(t.filter((function(n){return n.id!==e})))}))}}))};t(37);u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.6aafa755.chunk.js.map