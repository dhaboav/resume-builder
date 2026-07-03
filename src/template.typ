#import "conf.typ": *

// Helper for metadata layout (Split Left/Right)
#let _meta_grid(left, right) = {
  grid(
    columns: (1fr, auto),
    align: (alignment.left, alignment.right),
    left, right
  )
}

// Layout
#let resume_layout(author: "", contact: (), body) = {
  set page(paper: "a4", margin: 1.5cm)
  set text(font: "Arial", size: 10pt)
  set par(justify: true, leading: 0.65em)
  
  align(center)[
    #text(size: 18pt, weight: "bold")[#author] \
    #v(1pt)
    #contact.join(" | ")
  ]
  body
}

// SECTION
#let section(title) = {
  v(8pt)
  block(width: 100%)[
    #text(size: 11pt, weight: "bold")[#upper(title)]
    #v(-6pt)
    #line(length: 100%, stroke: 0.5pt)
  ]
}

// JOBS & EXPERIENCE
#let entry(
  title: "",
  company: "",
  location: "",
  date: "",
  description: []
) = {
  block(width: 100%, breakable: false)[
    #_meta_grid(
      text(weight: "bold")[#title], 
      text(size: meta-size)[#date]
    )
    #v(-4pt)
    #_meta_grid(
      text(size: meta-size)[#company], 
      text(size: meta-size)[#location]
    )
    #description
  ]
}

// PROJECT
#let projectsEntry(
  title: "",
  date: "",
  description: []
) = {
  block(width: 100%, breakable: false)[
    #_meta_grid(
      text(weight: "bold")[#title],
      text(size: meta-size)[#date]
    )
    #v(2pt)
    #description
  ]
}

// Skills
#let skillsEntry(skillsDict) = {
  set par(leading: 0.45em)
  block(width: 100%)[
    #for (category, items) in skillsDict.pairs() {
      [*#category:* #items]
      if category != skillsDict.keys().last() [ \ ]
    }
  ]
}

// Certification
#let certEntry(
  name: "",
  issuer: "",
  date: ""
) = {
  block(width: 100%, breakable: false)[
    #_meta_grid(
      [
        #text(weight: "bold")[#name]
        #if issuer != "" [ | #issuer ]
      ],
      text(size: meta-size)[#date]
    )
    #v(2pt)
  ]
}
