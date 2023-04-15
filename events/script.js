const next = document.getElementById('nextEvents')
const today = document.getElementById('todayEvents')

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function getEventBubble(name,content,date,time,location) {
    return htmlToElement(`
      <event class="event-bubble">
                            <name class="event-name block">${name}</name>
                            <content class="event-content">
                                <div class="notepad">
                                ${content}
                                </div>
                            </content>
                            <date class="event-loc event-date">${date}, ${time}</date>
                            <location class="event-loc event-location">${location}</location>
                        </event>
`)
}

function addEventLater(name,content,date,time,location,color) {
    next.appendChild(getEventBubble(name,content,date,time,location,color))
}

addEventLater("Prospective Student Bowling","Bowl at kingpins bowling with prospective students. There will be pizza!","Jan 3", "5pm","Meet at Gym Lot")
addEventLater("Guest Speaker Laurie Mills","Author of 'Girls and Sex' and 'Boys and Sex' speaks about gender in highschool.","Jan 4", "5pm","Gerlinger")