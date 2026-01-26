interface ResearchItems {
  id: string;
  date: string;
  title: string;
  summary: string;
  link: string;
}

export const researchItems: ResearchItems[] = [
    {
    id: "psychology",
    date: "December 3, 2025",
    title: "Doomscrolling",
    summary:
      "Doomscrolling can have many negative effects on the emotional well-being and mental health of all individuals. Thus, it's important to recognize this behavioral pattern and how to combat this vicious cycle.",
    link: "/research/Doomscrolling.pdf",
  },
  {
    id: "psychology",
    date: "October 29, 2025",
    title: "Anorexia Nervosa",
    summary: "Anorexia Nervosa is a serious mental health concern that affects how people perceive food. Individuals with this eating disorder may exhibit harmful behaviors to keep their weight low; however, this can lead to health issues due to the lack nutrition caused by restrictive diets.",
    link: "/research/Anorexia-Nervosa.pdf",
  },
  {
    id: "physics-math",
    date: "March 5, 2025",
    title: "Sustainable Materials in Electronics",
    summary:
      "This study investigates eco-friendly materials for electronic components, focusing on biodegradable semiconductors and recyclable conductors.",
    link: "#",
  },
  {
    id: "computer-science",
    date: "March 1, 2025",
    title: "Quantum Cryptography: Securing the Future",
    summary:
      "A detailed examination of quantum cryptography principles and their practical applications in cybersecurity.",
    link: "#",
  },
  {
    id: "computer-science",
    date: "February 20, 2025",
    title: "Neural Networks in Cognitive Development",
    summary:
      "An exploration of how artificial neural networks can help us understand human cognitive development.",
    link: "#",
  },
  {
    id: "computer-science",
    date: "February 15, 2025",
    title: "Machine Learning Applications in Chemical Analysis",
    summary:
      "This paper presents novel applications of machine learning algorithms in chemical analysis, including spectroscopy and molecular modeling.",
    link: "#",
  },
  {
    id: "psychology",
    date: "February 10, 2025",
    title: "The Psychology of STEM Education: Gender Perspectives",
    summary:
      "A comprehensive study examining psychological factors affecting gender representation in STEM fields.",
    link: "/research/The Psychology of Gender Bias in STEM Fields.pdf",
  }
];

// DO NOT EDIT BELOW THIS LINE - used for filtering
export const researchFilters = [
  "all",
  "psychology",
  "physics-math",
  "chemistry",
  "computer-science",
];