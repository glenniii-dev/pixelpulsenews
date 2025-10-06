import TeamMember from "@/components/cards/TeamMember";

export default function page() {
  return (
    <section className="flex flex-row flex-wrap items-center justify-center p-10 lg:px-20 lg:py-15 text-(--oxford-blue) gap-6">
      <div className="flex flex-col mb-6 justify-start w-full">
        <h1 className="text-4xl font-bold mb-4 text-(--chambray) text-shadow-md">Our Team</h1>
        <h3 className="text-lg mb-4">Meet the passionate individuals behind Pixel Pulse. Our diverse team of students and young professionals brings together expertise in STEM research, journalism, design, and technology to create engaging and informative content.</h3>
      </div>

      {/* SOHA */}
      <TeamMember image="https://dzoxjkfkahmyylvgiibw.supabase.co/storage/v1/object/public/team-images/1744584649464-IMG_3289.webp" name="Soha" role="Founder & President" bio="Hi there! I'm Soha, the founder and president of Pixel Pulse. I'm currently pursuing STEM and planning to major in either computer science or data science (still deciding!) at university. I truly hope Pixel Pulse grows into a valuable platform for both STEM students and beyond! I love reading and writing. :)" />
      
      {/* ROLLEEN */}
      <TeamMember image="/Rollean.webp" name="Rolleen" role="Vice President" bio="I'm Rolleen (pronounced row-lean)! I'm a high school student with a passion for chemistry, looking to pursue Chemical Engineering. I'm a big music nerd but I'm also a debater outside of Pixel Pulse! Glad to be part of this team as the research lead for Chemistry and Physics." />
      
      {/* DARREN */}
      <TeamMember image="https://cdn.glitch.global/e935e5cb-fc33-4f8d-a0d2-76cc83905dc9/darren.png?v=1739814810086" name="Darren" role="Graphic Designer + Admin Secretary" bio="Hi, I'm Darren, a high school student with experience in coding, web design, and graphic design. I'm passionate about technology and plan to pursue a computer science or software engineering career. Outside of tech, I enjoy both playing and watching sports, especially soccer and tennis." />

       {/* LYNN */}
      <TeamMember image="/Lynn.webp" name="Lynn" role="Graphic Design Dept Head" bio="Hi! My name is Lynn and I'm a high school senior. I want to pursue civil engineering and multi-media design in college. In my free time, I love painting, listening to music, going to the city, and hanging out with friends and family!" />

       {/* HARSITH */}
      <TeamMember image="/Harsith.webp" name="Harsith" role="Communication secretary & Newsletter director" bio="Hey there! I'm Harsith, a high school student super passionate about space, coffee, and badminton. I'm a STEM student and I love tinkering with projects and solving problems, and I'm excited about exploring aerospace engineering in the future. Really excited to be a part of this team!" />

       {/* MICHEAL */}
      <TeamMember image="" name="Micheal" role="CS/AI Research Lead" bio="My name is Michael! I am currently a junior in high school and 17. I am interested in STEM concepts and how they relate to the real world. My interests include drawing, fashion, golfing, and building wooden models. In the future I aspire to be a chemical engineer, and make an impact on my community through STEM applications." />

      {/* BENNY*/}
      <TeamMember image="/Benny.webp" name="Benny" role="Bio Research Lead" bio="I’m Benny, a 17 year old junior in high school with a strong passion for medicine, biology, and all aspects of STEM. I am also planning to pursue a pre-med track after high school in college. In my free time I enjoy playing tennis, watching sports, and most of all the thrill of different foods."/>

      {/* KATE */}
      <TeamMember image="/Kate.webp" name="Kate Xue" role="Psychology Research Lead" bio="Hi, my name is Kate and I’m the lead researcher in the psychology department! Besides watching fun videos on psychology, I also to draw and read!" />
         
      {/* ZIRWAH */}
      <TeamMember image="/Zirwah.webp" name="Zirwah" role="Graphic Designer" bio="Hi, I'm Zirwah. I'm a STEM student currently doing my A levels and would like to work with astrophysics at some point. I love collecting random facts and stories, integrating them into art, poetry and writing whenever I can. I also love to bake! Am I good at it? Sometimes. Is it fun? Always(full time: design department)" />
      
      {/* SRISTHI */}
      <TeamMember image="" name="Srishti" role="Biology Researcher" bio="My name is Srishti, I'm 15 and a rising sophomore in high school. I’m a full-time team member volunteering as a biology researcher. Although I haven’t decided exactly what career to pursue, STEM has always called to me. I consider learning and thinking as hobbies. Outside of STEM, I read YA fantasy books and practice Taekwondo as a black belt." />
      
      {/* DARA */}
      <TeamMember image="" name="Dara" role="Graphic Designer" bio="Hi, my name is Dara and I'm a graphics designer in the design department. I also recently joined the web department because I can't do without that ;). I want to pursue a career with coding and that allows me a lot of freedom to pursue a lot of my other interests. Currently I learn to dance and speak Korean in my free time!" />
      
      {/* ISHAQ */}
      <TeamMember image="" name="Ishaq" role="Content Writer" bio="Hi everyone, I'm 17 and in Year 13, currently studying for my A-Levels in London. I study Maths, Further Maths, Physics and Computer Science, and after university, I want to go into Software Engineering or A.I, although I may not stay in it forever. Outside of academics, I enjoy playing and watching squash, programming and playing video games." />
      
    </section>
  )
}
