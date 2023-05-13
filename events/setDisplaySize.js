// var browserZoomLevel = window.devicePixelRatio
let docHTML = document.body.innerHTML;
let pixelValues = [...docHTML.matchAll(/\d*px/g)].map(a=>a[0])
const micahsVW = 1440
const myVW = window.outerWidth
// const myVW = document.documentElement.clientWidth

pixelValues.forEach((oldstr)=>{
    let regex = new RegExp(oldstr, 'g') // global
    let newpx = getReplacementPxStr(oldstr,micahsVW,myVW)
    console.log(newpx)
    docHTML = docHTML.replace(regex,newpx)
})
document.body.innerHTML = docHTML

function getReplacementPxStr(old,oldvw,vw) {
    console.log(old)
    let px = parseFloat(old.replace('px',''))
    px = px / oldvw * vw
    return px + 'px'
}

