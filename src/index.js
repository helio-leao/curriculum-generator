import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { FONT_SIZE, FONT_TYPE, TEXT_COLOR } from "./constants.js";

const outputDirectory = "output";
const lineGap = 4;

const data = {
  name: "John Doe",
  role: "Suporte",
  email: "johndoe@email.com",
  phone: "+55 (99) 9.9999-5555 (Whatsapp)",
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
      description: [
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
      description: [
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

function generatePDF(data) {
  fs.mkdirSync(outputDirectory, { recursive: true });

  const doc = new PDFDocument({
    margin: 50, // sets all margins to 50 points (0.67 inches)
    size: "A4",
  });

  doc.pipe(
    fs.createWriteStream(
      path.join(
        outputDirectory,
        `${data.name.split(" ").join("_")}_${Date.now()}.pdf`
      )
    )
  );

  doc.lineGap(lineGap);

  doc
    .fontSize(FONT_SIZE.title)
    .font(FONT_TYPE.bold)
    .text(data.name, { align: "center" });
  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.regular)
    .text(data.role, { align: "center" });

  doc
    .fontSize(FONT_SIZE.text)
    .text(`\n${data.email} | ${data.phone} | ${data.linkedin}`, {
      align: "center",
    });
  doc.text(data.github, { align: "center" });

  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.bold)
    .text("\nCertificates\n\n");
  doc
    .fontSize(FONT_SIZE.text)
    .font(FONT_TYPE.regular)
    .text(data.certificates.join(" | "), { align: "center" });

  doc.fontSize(FONT_SIZE.subtitle).font(FONT_TYPE.bold).text("\nProfile\n\n");
  doc.fontSize(FONT_SIZE.text).font(FONT_TYPE.regular).text(data.profile);

  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.bold)
    .text("\nProfessional Experience\n\n");
  data.professionalExperience.forEach((experience, index) => {
    doc
      .font(FONT_TYPE.bold)
      .fontSize(FONT_SIZE.text)
      .text(experience.company, { continued: true })
      .font(FONT_TYPE.regular)
      .fontSize(FONT_SIZE.subtext)
      .text(experience.period, { align: "right" });
    doc
      .fontSize(FONT_SIZE.text)
      .fillColor(TEXT_COLOR.secondary)
      .text(experience.role, { continued: true })
      .fontSize(FONT_SIZE.subtext)
      .fillColor(TEXT_COLOR.primary)
      .text(experience.local, { align: "right" });
    doc.fontSize(FONT_SIZE.text).text(experience.description.join("\n"));
    if (index < data.professionalExperience.length - 1) {
      doc.fontSize(FONT_SIZE.text).text("\n");
    }
  });

  doc.fontSize(FONT_SIZE.subtitle).font(FONT_TYPE.bold).text("\nEducation\n\n");
  data.education.forEach((item, index) => {
    doc
      .font(FONT_TYPE.bold)
      .fontSize(FONT_SIZE.text)
      .text(item.degree, { continued: true })
      .font(FONT_TYPE.regular)
      .fontSize(FONT_SIZE.subtext)
      .text(item.period, { align: "right" });
    doc
      .fontSize(FONT_SIZE.text)
      .text(item.institution, { continued: true })
      .fontSize(FONT_SIZE.subtext)
      .text(item.local, { align: "right" });
    if (index < data.education.length - 1) {
      doc.fontSize(FONT_SIZE.text).text("\n");
    }
  });

  doc.fontSize(FONT_SIZE.subtitle).font(FONT_TYPE.bold).text("\nLanguages\n\n");
  doc
    .fontSize(FONT_SIZE.text)
    .font(FONT_TYPE.regular)
    .text(
      data.languages
        .map((language) => `${language.name} - ${language.level}`)
        .join("\n")
    );

  doc.end();
}

generatePDF(data);