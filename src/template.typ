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
    #contact.join("  |  ")
  ]
  body
}

// SECTION
#let section(title) = {
  v(8pt) // Space before the section header
  block(width: 100%)[
    #text(size: 11pt, weight: "bold")[#upper(title)]
    #v(-6pt) // This pulls the line UP right beneath the text baseline
    #line(length: 100%, stroke: 0.5pt)
  ]
  v(4pt) // Space before your content starts
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
    #_meta_grid(text(weight: "bold")[#title], text(style: "italic", fill: rgb("#718096"))[#date])
    #v(-2pt)
    #_meta_grid(text(style: "italic", fill: rgb("#4a5568"))[#company], text(fill: rgb("#718096"))[#location])
    #v(2pt)
    #description
  ]
}

// PROJECT
#let projectsEntry(
  title: "",
  techStack: "",
  date: "",
  description: []
) = {
  block(width: 100%, breakable: false)[
    #_meta_grid(
      [
        #text(weight: "bold")[#title]
        #if techStack != "" [ | _#text(fill: rgb("#4a5568"))[#techStack]_ ]
      ],
      text(style: "italic", fill: rgb("#718096"))[#date]
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
        #if issuer != "" [ | _#text(fill: rgb("#4a5568"))[#issuer]_ ]
      ],
      text(style: "italic", fill: rgb("#718096"))[#date]
    )
    #v(2pt)
  ]
}
