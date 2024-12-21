import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const outputDirectory = "output";

const titleSize = 20;
const subtitleSize = 16;
const textSize = 12;

const data = {
  name: "John Doe",
  role: "Web Developer",
  email: "johndoe@outlook.com",
  phone: "+55 99 999999999 (Whatsapp)",
  linkedin: "linkedin.com/in/johndoe",
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
});

doc.pipe(
  fs.createWriteStream(
    path.join(outputDirectory, `${data.name} ${Date.now()}.pdf`)
  )
);

doc.fontSize(titleSize).text(data.name, { align: "center" });
doc.fontSize(textSize).text(data.role, { align: "center" });

doc
  .fontSize(textSize)
  .text(`\n${data.email} ${data.phone} ${data.linkedin} ${data.github}`, {
    align: "center",
  });

doc.fontSize(subtitleSize).text("\n\nCertificates\n\n");
doc.fontSize(textSize).text(data.certificates.join(" "), { align: "center" });

doc.fontSize(subtitleSize).text("\n\nProfile\n\n");
doc.fontSize(textSize).text(data.profile);

doc.fontSize(subtitleSize).text("\n\nProfessional Experience\n\n");
data.professionalExperience.forEach((experience, index) => {
  doc.fontSize(textSize).text(experience.company);
  doc.fontSize(textSize).text(experience.role);
  doc.fontSize(textSize).text(experience.functions.join("\n"));
  if (index < data.professionalExperience.length - 1) {
    doc.fontSize(textSize).text("\n");
  }
});

doc.fontSize(subtitleSize).text("\n\nEducation\n\n");
data.education.forEach((item, index) => {
  doc.fontSize(textSize).text(item.degree);
  doc.fontSize(textSize).text(item.institution);
  if (index < data.education.length - 1) {
    doc.fontSize(textSize).text("\n");
  }
});

doc.fontSize(subtitleSize).text("\n\nLanguages\n\n");
doc
  .fontSize(textSize)
  .text(
    data.languages
      .map((language) => `${language.name} - ${language.level}`)
      .join("\n")
  );

doc.end();