#import "src/template.typ": *
#import "src/data.typ" as data

#show: doc => resume_layout(
  author: data.name,
  contact: data.contact_info,
  doc
)

// --- Smart List Helper ---
#let render_bullets(bulletsArray) = {
  if bulletsArray.len() > 0 [
    #set list(marker: ([•],), body-indent: 0.5em)
    #for bullet in bulletsArray {
      list.item(bullet)
    }
  ]
}

// --- PROJECTS SECTION ---
#section("projects")
#for project in data.projects {
  projectsEntry(
    title: project.title,
    techStack: project.techStack,
    date: project.date,
    description: render_bullets(project.bullets)
  )
}

// --- EXPERIENCE / ORGANIZATIONS SECTION ---
#section("organizations")
#for org in data.organizations {
  entry(
    title: org.title,
    company: org.company,
    location: org.location,
    date: org.date,
    description: render_bullets(org.bullets)
  )
}

// --- EDUCATION SECTION ---
#section("Education")
#entry(
  title: data.education.title,
  company: data.education.company,
  location: data.education.location,
  date: data.education.date,
  description: render_bullets(data.education.bullets)
)

// --- TECHNICAL SKILLS SECTION ---
#section("Technical Skills")
#skillsEntry(data.skills)

// --- CERTIFICATIONS SECTION ---
#section("certifications")
#for cert in data.certifications {
  certEntry(
    name: cert.name,
    issuer: cert.issuer,
    date: cert.date
  )
}