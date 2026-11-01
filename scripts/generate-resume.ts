import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import { personalInfo, education, skills, projects, research, certifications } from '../src/data';

// The website and PDF are generated from the same supplied portfolio content.
const doc = new PDFDocument({ size: 'A4', margin: 48, info: { Title: 'Hitesh Kanagala - Curriculum Vitae', Author: personalInfo.name } });
const stream = fs.createWriteStream('public/Hitesh_Kanagala_CV.pdf');
doc.pipe(stream);
const clean = (text: string) => text.replace(/[—–]/g, '-');
const text = (value: string, size = 10) => { doc.font('Helvetica').fontSize(size).fillColor('#262626').text(clean(value), { lineGap: 3 }); };
const heading = (value: string) => { doc.moveDown(.8); doc.font('Helvetica-Bold').fontSize(12).fillColor('#171717').text(value); doc.moveDown(.35); };
doc.font('Helvetica-Bold').fontSize(23).text(personalInfo.name);
doc.moveDown(.3); text(personalInfo.title, 11); text(personalInfo.location);
doc.moveDown(.4);
for (const [label,url] of [[personalInfo.email, 'mailto:'+personalInfo.email],['GitHub: hitesh175',personalInfo.githubUrl],['LinkedIn: hitesh-k-r',personalInfo.linkedinUrl]]) {
  doc.fontSize(10).fillColor('#262626').text(label, { link:url, underline:true, lineGap:3 });
}
heading('Profile'); text(personalInfo.careerObjective);
heading('Education');
education.forEach(item=> { doc.font('Helvetica-Bold').fontSize(10).text(item.institution+' | '+item.period); text(item.degree+' - '+item.field); doc.moveDown(.3); });
heading('Technical skills');
for (const [label,items] of [['Programming',skills.languages],['Data science',skills.dataScience],['Machine learning',skills.machineLearning],['Visualization',skills.visualization],['Databases',skills.databases],['Tools',skills.tools]] as [string,string[]][]) text(label+': '+items.join(', '));
// Explicit page break keeps selected work together and predictable across builds.
doc.addPage(); heading('Selected projects');
projects.slice(0,5).forEach(project=> {
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#171717').text(project.title, {link:project.githubLink});
  text(project.techStack.join(' / '),9); text(project.description); doc.moveDown(.65);
});
heading('Research'); text(research.title,11); text(research.journal);
doc.fontSize(9).text('Read publication', {link:research.paperUrl,underline:true});
heading('Selected certifications');
certifications.slice(0,4).forEach(cert=>text(cert.name+' - '+cert.issuer+' ('+cert.date+')',9));
doc.end();
await new Promise<void>((resolve,reject)=>{stream.on('finish',resolve);stream.on('error',reject);});
