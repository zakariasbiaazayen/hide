import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import Events from '../components/sections/Events'
import Team from '../components/sections/Team'
import NewsLettre from '../components/sections/NewsLettres'

const Home = () => {
  return (
   <>
    <Header/>
    <main>
      <Hero/>
      <About/>
      <Events/>
      <Team/>
      <Projects/>
      <NewsLettre/>
    </main>
    <Footer/>
   </>
  )
}

export default Home