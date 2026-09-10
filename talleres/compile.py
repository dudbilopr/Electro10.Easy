import os
import subprocess

source_tex = r'''c:\Users\dudbi\Downloads\Cursos_UNAB\Curso_Electromagnetismo\Electromagnetismo_repo\Talleres\Taller_de_Repaso.tex'''
with open(source_tex, 'r', encoding='utf-8') as f:
    taller_content = f.read()

start_idx = taller_content.find(r'\mysection{Metodología: Guía para la Resolución Efectiva de Problemas}')
end_idx = taller_content.find(r'\end{document}')
body_content = taller_content[start_idx:end_idx]
body_content = body_content.replace(r'\newpage', '')

template = r'''\documentclass[11pt,letterpaper]{article}

\usepackage[letterpaper,top=5.0cm,bottom=2.5cm,left=2.0cm,right=2.0cm,
            headheight=70pt,headsep=35pt]{geometry}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[spanish,es-nodecimaldot]{babel}
\usepackage[scaled=0.95]{helvet}
\usepackage{amsmath, amsfonts, amssymb}
\usepackage{graphicx}
\usepackage[table]{xcolor}
\usepackage{tabularx}
\usepackage{array}
\usepackage{fancyhdr}
\usepackage{enumitem}
\usepackage{lastpage}
\usepackage{needspace}
\usepackage{tikz}
\usetikzlibrary{babel,calc,patterns,arrows,arrows.meta,3d,perspective}
\usepackage{tikz-3dplot}
\usepackage{multicol}
\usepackage{hyperref}
\usepackage{microtype}
\usepackage{pgffor}

\renewcommand{\familydefault}{\sfdefault}
\definecolor{linecolor}{HTML}{000000}

% Paleta de colores UNAB y niveles
\definecolor{unabBlue}{HTML}{003865}
\definecolor{unabOrange}{HTML}{E85C0B}
\definecolor{facil}{HTML}{2E7D32}
\definecolor{medio}{HTML}{F57F17}
\definecolor{dificil}{HTML}{C62828}

\hypersetup{
    colorlinks=true,
    linkcolor=unabBlue,
    urlcolor=unabBlue
}

\setlength{\parindent}{0pt}
\setlength{\parskip}{5pt}
\renewcommand{\arraystretch}{1.5}

% ---------- Datos editables del examen ----------
\newcommand{\NombreCurso}{Electromagnetismo}
\newcommand{\NombreProfesor}{Dudbil Olvasada Pabon Riaño}
\newcommand{\FechaExamen}{}
\newcommand{\TiempoExamen}{Práctica Autónoma}
\newcommand{\TituloEvaluacion}{TALLER DE REPASO: ELECTROSTÁTICA}

% ---------- Encabezado institucional ----------
\pagestyle{fancy}
\fancyhf{}
\fancyhead[R]{%
  \begin{minipage}{0.4\textwidth}
    \raggedleft
    {LOGO_REPLACE}\\[2pt]
    {\scriptsize \textcolor{gray}{\textbf{Departamento de Ciencias Básicas}}}
  \end{minipage}}
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[C]{\scriptsize \textcolor{gray}{{FOOTER_REPLACE} \hspace{0.7em}|\hspace{0.7em} Departamento de Ciencias Básicas}}
\fancyfoot[R]{\scriptsize \textcolor{gray}{Página \thepage\ de \pageref{LastPage}}}

% ---------- Componentes reutilizables ----------
\newcommand{\Etiqueta}[1]{%
  {\fontsize{11}{13}\selectfont\bfseries\MakeUppercase{#1}}}

\newcommand{\Campo}[2]{%
  \Etiqueta{#1}\\[-2pt]
  {\fontsize{14}{16}\selectfont #2}}

% Comando de sección manual con salto de página
\newcommand{\mysection}[1]{
  \newpage
  \vspace{0.5cm}\noindent{\Large\bfseries\color{unabBlue} #1}
  \vspace{0.2cm}\hrule\vspace{0.3cm}
}
\newcommand{\mysubsection}[1]{
  \vspace{0.3cm}\noindent{\large\bfseries\color{unabBlue} #1}
}

% Entornos personalizados
\newcommand{\raebox}[1]{
  \vspace{0.4cm}
  \noindent\fcolorbox{unabBlue}{unabBlue!5}{
    \begin{minipage}{\dimexpr\textwidth-2\fboxsep-2\fboxrule\relax}
      #1
    \end{minipage}
  }
  \vspace{0.4cm}
}

\newcommand{\teoriabox}[1]{
  \vspace{0.4cm}
  \noindent\fcolorbox{unabOrange}{white}{
    \begin{minipage}{\dimexpr\textwidth-2\fboxsep-2\fboxrule\relax}
      #1
    \end{minipage}
  }
  \vspace{0.4cm}
}

% Etiquetas de dificultad
\newcommand{\difFacil}{\textcolor{facil}{\textbf{[Básico]}}}
\newcommand{\difMedio}{\textcolor{medio}{\textbf{[Intermedio]}}}
\newcommand{\difDificil}{\textcolor{dificil}{\textbf{[Avanzado]}}}

% Comando para problemas (Elegante)
\newcounter{problema}
\newcommand{\problema}[2]{
    \stepcounter{problema}
    \needspace{4\baselineskip}
    \vspace{0.4cm}\noindent\textbf{\textcolor{unabBlue}{Problema \theproblema}}\ (#1) \hfill #2\par\vspace{0.1cm}\noindent
}

% Respuesta
\newcommand{\respuesta}[1]{
    \par\vspace{0.1cm}\noindent\textbf{R/ } \textit{#1}
}

\begin{document}

\vspace*{1cm}
\begin{center}
  {\fontsize{20}{24}\selectfont\bfseries\color{unabBlue}\TituloEvaluacion}\par
  \vspace{0.3cm}
  {\large\textit{Modelado Matemático}}\par
\end{center}
\vspace{1cm}

% ---------- Identificación ----------
\noindent
\arrayrulecolor{unabBlue}
\begin{tabularx}{\textwidth}{|>{\raggedright\arraybackslash}X|>{\raggedright\arraybackslash}X|}
\hline
\rowcolor{unabBlue!10}
\textbf{\color{unabBlue}NOMBRE DEL ESTUDIANTE:} & \textbf{\color{unabBlue}ID ESTUDIANTE:} \\[15pt]
\hline
\textbf{\color{unabBlue}CURSO:} \NombreCurso & \textbf{\color{unabBlue}PROFESOR:} \NombreProfesor \\
\hline
\textbf{\color{unabBlue}FECHA:} \FechaExamen & \textbf{\color{unabBlue}TIEMPO ASIGNADO:} \TiempoExamen \\
\hline
\end{tabularx}
\arrayrulecolor{black}

\vspace{1cm}

% ---------- Indicaciones ----------
{\fontsize{14}{17}\selectfont\bfseries\color{unabBlue} PREFACIO E INDICACIONES}

\vspace{5pt}
\noindent\fcolorbox{unabBlue}{white}{%
  \parbox{\dimexpr\textwidth-2\fboxsep-2\fboxrule\relax}{%
    \fontsize{12}{15}\selectfont
    \vspace{5pt}
    Este compendio presenta una colección estructurada de preguntas conceptuales y problemas analíticos seleccionados del texto \textit{Problemas de Física Tomo II} (Burbano). El diseño tipográfico sigue los estándares de los textos universitarios en ciencias exactas. Los problemas están categorizados por dificultad para guiar el estudio autónomo. \\ \\
    \textbf{\color{unabOrange}Importancia de la Práctica:} En física, el verdadero aprendizaje no ocurre al memorizar fórmulas, sino al enfrentarse iterativamente a los problemas. Resolver rigurosamente todos los ejercicios propuestos es el único camino para desarrollar la intuición física, el razonamiento analítico y la destreza matemática necesarias para modelar con éxito los fenómenos del mundo real. ¡No te saltes ningún paso!
    
    \vspace{8pt}
    \textbf{\color{unabOrange}Taxonomía de Dificultad:}
    \begin{itemize}[leftmargin=*, noitemsep, topsep=2pt, parsep=2pt]
        \item \difFacil: Aplicación directa de conceptos fundamentales y fórmulas en 1D o con simetrías triviales.
        \item \difMedio: Requiere descomposición vectorial estricta (2D), superposición espacial, o análisis trigonométrico.
        \item \difDificil: Involucra distribuciones continuas de carga (cálculo integral avanzado), problemas tridimensionales (3D), o acoplamiento físico con las Leyes de Newton (dinámica y oscilaciones).
    \end{itemize}
    \vspace{5pt}
  }
}

\vspace{12pt}

{BODY_REPLACE}

\end{document}
'''

template = template.replace('{BODY_REPLACE}', body_content)

unab_logo = r'\includegraphics[width=4.4cm]{../../Plantilla_LaTeX_Examen_Ciencia_de_Datos_UNAB/logo_ciencia_datos_negro.png}'
unab_footer = 'Universidad Autónoma de Bucaramanga -- UNAB'
general_logo = r'{\large\bfseries\color{gray} INSTITUCIÓN EDUCATIVA}'
general_footer = 'Institución Educativa'

unab_content = template.replace('{LOGO_REPLACE}', unab_logo).replace('{FOOTER_REPLACE}', unab_footer)
general_content = template.replace('{LOGO_REPLACE}', general_logo).replace('{FOOTER_REPLACE}', general_footer)

output_dir = r'c:\Users\dudbi\Downloads\Cursos_UNAB\Curso_Electromagnetismo\Electromagnetismo_repo\Talleres'
with open(os.path.join(output_dir, 'Taller_de_Repaso_UNAB.tex'), 'w', encoding='utf-8') as f:
    f.write(unab_content)

with open(os.path.join(output_dir, 'Taller_de_Repaso_General.tex'), 'w', encoding='utf-8') as f:
    f.write(general_content)

for i in range(2):
    subprocess.run(['pdflatex', '-interaction=nonstopmode', 'Taller_de_Repaso_UNAB.tex'], cwd=output_dir)
    subprocess.run(['pdflatex', '-interaction=nonstopmode', 'Taller_de_Repaso_General.tex'], cwd=output_dir)

print('Compilation complete.')
