# 📄 Modular Typst Resume Builder

A modular, DRY, and highly customizable resume framework built with Typst.

Create and maintain your resume by separating **content**, **layout**, and **compilation**, making updates simple and reusable.

## ✨ Features

- 📦 Modular project structure
- 🎨 Clean and customizable template
- 📝 Content separated from styling

## 📁 Project Structure

```text
.
├── src/
│   ├── template.typ        # Resume layout and styling
│   ├── data.example.typ    # Example resume data
│   └── data.typ            # Your personal resume data (create this locally)
├── output/
│   └── output_resume.pdf   # Generated resume
├── .gitignore
├── main.typ                # Main entry point
└── README.md
```

## 🚀 Getting Started

### 1. Install Typst

Install the Typst compiler.

### 2. Create your data file

```bash
cp src/data.example.typ src/data.typ
```

Fill in `src/data.typ` with your personal information.

### 3. Compile the resume

Watch for changes while editing:

```bash
typst watch main.typ output/resume.pdf
```

Or compile once:

```bash
typst compile main.typ output/resume.pdf
```

## 🛠 Customization

- Edit `src/data.typ` to update your resume content.
- Edit `src/template.typ` to customize the design and layout.
- `main.typ` is the main entry point that combines everything into the final document.
