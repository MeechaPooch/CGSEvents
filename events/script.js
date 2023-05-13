const next = document.getElementById('nextEvents')
const today = document.getElementById('todayEvents')

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function getEventBubble(name,content,date,time,location,color) {

    let bgType=null;
    let bg=""
    let swatches=[]
    if(!color) {color ='#0cc2f5'}
    if(color.endsWith('.png') || color.endsWith('.jpg') || color.endsWith('.jpeg')) {
        bg = `url('${color}')`
        bgType='img'
        // let vibrant = new Vibrant(imageElem);
        // swatches = vibrant.swatches()
    } else {
        try{
    let color1 = new Color(color);
    let color2 = new Color(color);
    // color1.hsl.h+=20
    color1.hsl.l+=20
    color1.hsl.s+=40
    // color2.hsl.l-=10
    color2.hsl.s+=0
    bg = `linear-gradient(45deg, ${color2},${color1})`
        } catch(e) {
            bg = `linear-gradient(45deg, rgba(255, 255, 255, 0.267),rgba(0, 0, 0, 0.211)), linear-gradient(45deg, ${color}, ${color})`
        }
    }

    // let color1=new RGBColor((color.h + ', ' + color.g + ', ' + color.b))
    // let color2=new RGBColor((color.r + ', ' + color.g + ', ' + color.b))

    let ret = htmlToElement(`
      <event class="event-bubble" style="background-image:${bg};">
                            <name class="event-name block"><span class="event-name-text">${name}</span></name>
                            <content class="event-content">
                                <div class="notepad">
                                ${content}
                                </div>
                            </content>
                            <div class="blank-space-baby"></div>
                            <date class="event-loc event-date">${date}, ${time}</date>
                            <location class="event-loc event-location">${location}</location>
                        </event>
`)


// if(!content || content=="") {ret.querySelector('.event-content').style.visibility = 'hidden'}
if(!content || content=="") {ret.querySelector('.event-content').style.display = 'none'}
if(bgType=='img') {
    console.log(swatches)
    console.log(ret.querySelectorAll('.event-name-text, .event-loc'))
    ret.querySelectorAll('.event-name-text, .event-loc').forEach(thing=>thing.classList.add('standout'))
    
    let imageElem = document.createElement('img')
    imageElem.onload=()=>{
        let swatches = {};
        try{
        swatches = new Vibrant(imageElem).swatches();
        } catch(e) {}
        let rgb = (swatches.Muted ?? swatches.DarkMuted ?? swatches.DarkVibrant ?? swatches.DarkVibrant ?? [0,0,0]).rgb;
        // let rgb = new Vibrant(imageElem).swatches().DarkVibrant.rgb;
        let rgba = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.7)`
        console.log(rgba)
        ret.querySelectorAll('.standout').forEach(div=>{
            div.style.background = rgba
            div.style.boxShadow = ` 0rem 0rem 6rem 3rem ${rgba}`
        }
        )
        // ret.querySelector('.standout').style.background = 'red'
        // console.log(getAverageRGB(imageElem))
    }
    imageElem.crossOrigin = "Anonymous";
    imageElem.src=color;
    



}
return ret;
}

function addEventLater(name,content,date,time,location,color) {
    next.appendChild(getEventBubble(name,content,date,time,location,color))
}

for(let i=0;i<5;i++) {
addEventLater("Prospective Student Bowling","Bowl at kingpins bowling with prospective students. There will be pizza!","Jan 3", "5pm","Meet at Gym Lot",'blue')
addEventLater("Peggy Orenstein Author Visit","Author of 'Girls and Sex' and 'Boys and Sex' speaks about gender in highschool.","Jan 4", "5pm","Gerlinger", 'https://images.squarespace-cdn.com/content/v1/5a6935a029f187b0f218bf74/1518817690799-NNIK189ODHHX201PAWTB/Girls_and_Sex_by_Peggy_Orenstein2.png')
// addEventLater("Guest Speaker Laurie Mills","Author of 'Girls and Sex' and 'Boys and Sex' speaks about gender in highschool.","Jan 4", "5pm","Gerlinger", 'https://images.squarespace-cdn.com/content/v1/5a6935a029f187b0f218bf74/1518817690799-NNIK189ODHHX201PAWTB/Girls_and_Sex_by_Peggy_Orenstein2.png')
addEventLater("RICKY MONTGOMERY TOUR!","","Jan 4", "5pm","Shaff", 'https://s9.limitedrun.com/images/1618510/v600_Screen_Shot_2023-01-10_at_8.50.49_AM.png')
addEventLater("Basketball Games VS Oberlin","Watch our eags whoop music major virgin ass ass","Jan 4", "5pm","Schaff Circle", 'https://cdn.vox-cdn.com/thumbor/S2sNHpsVbkG-WFFyYY_Tel3yj08=/0x0:4506x2802/1200x800/filters:focal(1525x376:2245x1096)/cdn.vox-cdn.com/uploads/chorus_image/image/70297114/1293213332.0.jpg')
addEventLater("Rock Band Performance",'A night of great rock, selected and performed by our band "Areas of Growth"',"Jan 15", "5pm","Cabell", 'https://trixondrumsusa.com/wp-content/uploads/2019/09/trixon-5pc-drum-set-transparent-blue.jpg')
addEventLater("Senior Graduation Class of 2023",null,"Jun 15", "10am-2pm","The Paddock", '#38a7fc')
addEventLater("CG Theater One-Acts","Students have been working hard writing, directing and starring in these eleven single-act short plays.",'May 12','7pm',"Cabell Theater",'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_4/v1661978008/catlingabel/ufbbpvuxcv0xopa05q9i/1275x675-performances-1.jpg')
}