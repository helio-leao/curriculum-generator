import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const outputDirectory = "output";

const titleSize = 22;
const subtitleSize = 14;
const textSize = 10;
const subtextSize = 8;

const font = "Helvetica";
const boldFont = "Helvetica-Bold";

const data = {
  name: "John Doe",
  role: "Web Developer",
  email: "johndoe@outlook.com",
  phone: "+55 99 999995555 (Whatsapp)",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  certificates: [
    "Microsoft Azure AZ-900",
    "DevOps Institute - SRE",
    "Microsoft Azure AZ-900",
    "DevOps Institute - SRE",
  ],
  profile: `Data Engineer / Data Analytics : Cloud Azure | SQL | PostgreSQL | MongoDB Atlas | Python | CosmosDB | Big Data |
Databricks | Power BI
SRE : Monitoring and Observability | AWS | Azure | Databases | Automation | Instances Cloud | Docker | Rancher
DevOps Engineer : Linux Avançado | Windows | Pipelines | Git | Terraform, Ansible |
Databases( PostgreSQL,MySQL,MongoDB Atlas, CosmosDB) | Scripts Bash/Python | Azure DevOps | AWS | Heroku |
NewRelic | Dynatrace | Datadog.`,
  professionalExperience: [
    {
      company: "NTT DATA Europe & Latam",
      role: "Site Reliability Engineer/DevOps",
      local: "Remote, Brazil",
      period: "02/2023 – 07/2024",
      functions: [
        `Experiência Profissional Experiência em projetos de BI/Analytics, Cloud Azure
Databricks e Power BI.`,
        `Experiência em SQL para manutenção e análise de banco de dados relacional.`,
        `Experiência com Migração de Dados, entre bancos ou dados brutos de
planilhas/terceiros.`,
      ],
    },
    {
      company: "NTT DATA Europe & Latam",
      role: "Site Reliability Engineer/DevOps",
      local: "Remote, Brazil",
      period: "02/2023 – 07/2024",
      functions: [
        `Experiência Profissional Experiência em projetos de BI/Analytics, Cloud Azure
Databricks e Power BI.`,
        `Experiência em SQL para manutenção e análise de banco de dados relacional.`,
        `Experiência com Migração de Dados, entre bancos ou dados brutos de
planilhas/terceiros.`,
      ],
    },
  ],
  education: [
    {
      institution: "Cruzeiro do Sul",
      degree: "Bacharel - Engenharia de Software",
      local: "Brusque,SC, Brasil",
      period: "02/2023 – 07/2024",
    },
    {
      institution: "Cruzeiro do Sul",
      degree: "Bacharel - Engenharia de Software",
      local: "Brusque,SC, Brasil",
      period: "02/2023 – 07/2024",
    },
  ],
  languages: [
    {
      name: "Português",
      level: "Nativo",
    },
    {
      name: "Inglês",
      level: "Intermediário",
    },
  ],
};

fs.mkdirSync(outputDirectory, { recursive: true });

const doc = new PDFDocument({
  margin: 50, // sets all margins to 50 points (0.67 inches)
  size: "A4",
});

doc.pipe(
  fs.createWriteStream(
    path.join(outputDirectory, `${data.name} ${Date.now()}.pdf`)
  )
);

doc.fontSize(titleSize).font(boldFont).text(data.name, { align: "center" });
doc.fontSize(subtitleSize).font(font).text(data.role, { align: "center" });

doc.fontSize(textSize);
doc.text(`\n${data.email} | ${data.phone} | ${data.linkedin}`, {
  align: "center",
});
doc.text(data.github, { align: "center" });

doc.fontSize(subtitleSize).font(boldFont).text("\n\nCertificates\n\n");
doc
  .fontSize(textSize)
  .font(font)
  .text(data.certificates.join(" | "), { align: "center" });

doc.fontSize(subtitleSize).font(boldFont).text("\n\nProfile\n\n");
doc.fontSize(textSize).font(font).text(data.profile);

doc
  .fontSize(subtitleSize)
  .font(boldFont)
  .text("\n\nProfessional Experience\n\n");
data.professionalExperience.forEach((experience, index) => {
  doc
    .font(font)
    .fontSize(textSize)
    .text(experience.company, { continued: true })
    .fontSize(subtextSize)
    .text(experience.period, { align: "right" });
  doc
    .fontSize(textSize)
    .text(experience.role, { continued: true })
    .fontSize(subtextSize)
    .text(experience.local, { align: "right" });
  doc.fontSize(textSize).text(experience.functions.join("\n"));
  if (index < data.professionalExperience.length - 1) {
    doc.fontSize(textSize).text("\n");
  }
});

doc.fontSize(subtitleSize).font(boldFont).text("\n\nEducation\n\n");
data.education.forEach((item, index) => {
  doc
    .font(font)
    .fontSize(textSize)
    .text(item.degree, { continued: true })
    .fontSize(subtextSize)
    .text(item.period, { align: "right" });
  doc
    .fontSize(textSize)
    .text(item.institution, { continued: true })
    .fontSize(subtextSize)
    .text(item.local, { align: "right" });
  if (index < data.education.length - 1) {
    doc.fontSize(textSize).text("\n");
  }
});

doc.fontSize(subtitleSize).font(boldFont).text("\n\nLanguages\n\n");
doc
  .fontSize(textSize)
  .font(font)
  .text(
    data.languages
      .map((language) => `${language.name} - ${language.level}`)
      .join("\n")
  );

doc.end();
