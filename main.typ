#import "src/template.typ": *
#import "src/data.typ" as data

// CONFIGURATION=============================
#let lang = "id" // id or en
#let target_role = "web" // web or firmware
// ==========================================

#let active_data = if lang == "id" { data.id } else { data.en }
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
// Menggunakan .filter() untuk menyaring proyek yang sesuai dengan role target
#let section_title = if lang == "id" { "Proyek" } else { "Projects" }
#section(section_title)

#for project in active_data.projects.filter(p => p.role == target_role) {
  projectsEntry(
    title: project.title,
    date: project.date,
    description: render_bullets(project.bullets)
  )
}

// --- EXPERIENCE / ORGANIZATIONS SECTION ---
#let org_title = if lang == "id" { "Organisasi" } else { "Organizations" }
#section(org_title)
#for org in active_data.organizations {
  entry(
    title: org.title,
    company: org.company,
    location: org.location,
    date: org.date,
    description: render_bullets(org.bullets)
  )
}

// --- EDUCATION SECTION ---
#let edu_title = if lang == "id" { "Pendidikan" } else { "Education" }
#section(edu_title)
#entry(
  title: active_data.education.title,
  company: active_data.education.company,
  date: active_data.education.date,
  location: active_data.education.location,
  description: render_bullets(active_data.education.bullets)
)

// --- TECHNICAL SKILLS SECTION ---
#let skills_title = if lang == "id" { "Keahlian Teknis" } else { "Technical Skills" }
#section(skills_title)
#skillsEntry(active_data.skills)

// --- CERTIFICATIONS SECTION ---
#let cert_title = if lang == "id" { "Sertifikasi" } else { "Certifications" }
#section(cert_title)
#for cert in active_data.certifications {
  certEntry(
    name: cert.name,
    issuer: cert.issuer,
    date: cert.date
  )
}
