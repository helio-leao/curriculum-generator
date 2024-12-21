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
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
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
      description: `- Experiência Profissional Experiência em projetos de BI/Analytics, Cloud Azure
Databricks e Power BI.
- Experiência em SQL para manutenção e análise de banco de dados relacional.
- Experiência com Migração de Dados, entre bancos ou dados brutos de
planilhas/terceiros.
- Experiência com Python PySpark para ingestão de dados.
- Experiência com nuvem (Azure, AWS).`,
    },
    {
      company: "NTT DATA Europe & Latam",
      role: "Site Reliability Engineer/DevOps",
      local: "Remote, Brazil",
      period: "02/2023 – 07/2024",
      description: `- Experiência Profissional Experiência em projetos de BI/Analytics, Cloud Azure
Databricks e Power BI.
- Experiência em SQL para manutenção e análise de banco de dados relacional.
- Experiência com Migração de Dados, entre bancos ou dados brutos de
planilhas/terceiros.
- Experiência com Python PySpark para ingestão de dados.
- Experiência com nuvem (Azure, AWS).`,
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

  doc.registerFont(
    FONT_TYPE.fontAwesome,
    path.join("assets", "fonts", "Font Awesome 6 Free-Solid-900.otf")
  );
  doc.registerFont(
    FONT_TYPE.fontAwesomeBrands,
    path.join("assets", "fonts", "Font Awesome 6 Brands-Regular-400.otf")
  );

  doc.lineGap(lineGap); // distance between lines of text

  // Name
  doc
    .fontSize(FONT_SIZE.title)
    .font(FONT_TYPE.bold)
    .text(data.name, { align: "center" });

  // Role
  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.regular)
    .text(data.role, { align: "center" });

  // Contact
  doc
    .fontSize(FONT_SIZE.text)
    .font(FONT_TYPE.fontAwesome)
    .text("\n\uf0e0 ", { continued: true })
    .font(FONT_TYPE.regular)
    .text(data.email, { continued: true })
    .font(FONT_TYPE.fontAwesome)
    .text(" \uf095 ", { continued: true })
    .font(FONT_TYPE.regular)
    .text(data.phone, { continued: true })
    .font(FONT_TYPE.fontAwesomeBrands)
    .text(" \uf08c ", { continued: true })
    .font(FONT_TYPE.regular)
    .text(data.linkedin, { continued: true })
    .font(FONT_TYPE.fontAwesomeBrands)
    .text(" \uf09b ", { continued: true })
    .font(FONT_TYPE.regular)
    .text(data.github);

  // Certificates
  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.fontAwesome)
    .text("\n\uf559 ", { continued: true })
    .font(FONT_TYPE.bold)
    .text("Certificates\n\n")
    .fontSize(FONT_SIZE.text)
    .font(FONT_TYPE.regular)
    .text(data.certificates.join(" • "), { align: "center" });

  // Profile
  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.fontAwesome)
    .text("\n\uf2bb ", { continued: true })
    .font(FONT_TYPE.bold)
    .text("Profile\n\n")
    .fontSize(FONT_SIZE.text)
    .font(FONT_TYPE.regular)
    .text(data.profile);

  // Professional Experience
  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.fontAwesome)
    .text("\n\uf0b1 ", { continued: true })
    .font(FONT_TYPE.bold)
    .text("Professional Experience\n");
  data.professionalExperience.forEach((experience) => {
    doc
      .text("\n")
      .font(FONT_TYPE.bold)
      .fontSize(FONT_SIZE.text)
      .text(experience.company, { continued: true })
      .font(FONT_TYPE.regular)
      .fontSize(FONT_SIZE.subtext)
      .text(experience.period, { align: "right" })
      .fontSize(FONT_SIZE.text)
      .fillColor(TEXT_COLOR.secondary)
      .text(experience.role, { continued: true })
      .fontSize(FONT_SIZE.subtext)
      .fillColor(TEXT_COLOR.primary)
      .text(experience.local, { align: "right" })
      .fontSize(FONT_SIZE.text)
      .text(experience.description);
  });

  // Education
  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.fontAwesome)
    .text("\n\uf19d ", { continued: true })
    .font(FONT_TYPE.bold)
    .text("Education\n");
  data.education.forEach((item) => {
    doc
      .text("\n")
      .font(FONT_TYPE.bold)
      .fontSize(FONT_SIZE.text)
      .text(item.degree, { continued: true })
      .font(FONT_TYPE.regular)
      .fontSize(FONT_SIZE.subtext)
      .text(item.period, { align: "right" })
      .fontSize(FONT_SIZE.text)
      .fillColor(TEXT_COLOR.secondary)
      .text(item.institution, { continued: true })
      .fontSize(FONT_SIZE.subtext)
      .fillColor(TEXT_COLOR.primary)
      .text(item.local, { align: "right" });
  });

  // Languages
  doc
    .fontSize(FONT_SIZE.subtitle)
    .font(FONT_TYPE.fontAwesome)
    .text("\n\uf0ac ", { continued: true })
    .font(FONT_TYPE.bold)
    .text("Languages\n\n")
    .fontSize(FONT_SIZE.text);
  data.languages.forEach((language) => {
    doc
      .font(FONT_TYPE.bold)
      .text(language.name, { continued: true })
      .font(FONT_TYPE.regular)
      .text(" - ", { continued: true })
      .text(language.level);
  });

  doc.end();
}

generatePDF(data);
