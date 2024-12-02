import Accordian from "./Accordian";
import Paragraph from "./Paragraph";
import SubTitle from "./SubTitle";
import Title from "./Title";
import { useState } from "react";

export default function Bio () {

    return (
        <div className="w-full">
            <Title 
                title="Portfolio"
            />
            <SubTitle 
                title="About"
            />
            <div>
                <Paragraph 
                    text="I'm an experienced software engineer who has been working in the industry professionally since 2017 but built my first website for fun in 2009.  Back then I built most of the assets in photoshop and arranged them in html div's before adding some fancy with css."
                />
                <Paragraph 
                    text="Thankfully things have come along way since then and now I use a tech stack of Laravel, Vue or React and Tailwind, which has increased the possiblity for creativity exponentially."
                />

                <Paragraph 
                    text="For the first time since I started working in the industry I have found myself out of work and looking for a new job after a company merger rendered the product I was working on and my entire team obsolete."
                />
                <Paragraph 
                    text="I've chosen to treat this as a blessing in disguise as I'm now able to take a step back and reflect on what I've achieved and what I want to do next."
                />
                {/* <Paragraph 
                    text="However, while I'm enjoying coding for myself as these projects below will hopefully testify to.  
                    I've also realised that the current jobs market is less exciting than I'd hoped it would be."
                />
                <Paragraph 
                    text="Opportunities are waining as the year draws to a close and competition is fierce so I'm now conflicted as to whether I should spend my time making this site a true reflection of my qualities, or instead trawl LinkedIn etc looking for that opportunity which excites me to apply."
                /> */}
                <Paragraph 
                    text="Hopefully if you're looking at this, then I've taken an interest in your company and now you're doing the same. :)"
                />
            </div>
            <div>
                <SubTitle 
                    title="Experience"
                />
                {/* compost monster experience - do I want this? */}
                {/* <Paragraph 
                    text="I've always enjoyed being creative and making things.  One of those projects was called the Compost Monsters, which were initially creatures made of fruit skins that I released as a series of cards and then started making into stop motion animations and wunderkammer style exhibits.  To flesh out the world further I wanted to build a website in the style of conspiracy theorist trying to share his 'truth' with the world."
                /> */}

                <Accordian title="DevelopMe" small={true} indent="ml-6">
                    <Paragraph 
                        text="I could go back further, to when I was making stop motion animations and building themed websites based on my creations. But to keep this concise, I will start from when I attended the DevelopMe Coding Fellowship."
                    />
                    <Paragraph 
                        text="I already had some experience but wanted to get a better grounding of skills so I could more confidently apply for professional roles. It was there that I got to familiarise myself with Wordpress, Drupal, Angular and for me most importantly Laravel.  I enjoyed learning them all, as I was so keen to pick up new skills but something about Laravel really stuck with me."
                    />
                    <Paragraph 
                        text="After graduating I wasn't content to stick with the skills I'd picked up and immediately started to teach myself Vue.  A few months later I applied for a role at Office Pantry, and during my interview proposed building them a system with Laravel and Vue."
                    />
                </Accordian>
                
                <Accordian title="Office Pantry" small={true} indent="ml-6">
                    <Paragraph 
                        text="Bypassing the more traditional junior role, I jumped straight into having to take full ownership of the project.  I took a look at how they were currently running their business and then built them some easy wins to speed up their processes."
                    />
                    <Paragraph 
                        text="They were heavily reliant on excel spreadsheets and spent hours doing the same repetitive tasks each week, so I built a V1 system which read these spreadsheets, automated the repetition and downloaded the processed files."
                    />
                    <Paragraph 
                        text="It was a fantastic way of building up my skills and seeing their real world benefit to both the business but also the employee's quality of life.  The next step was building a system which handled stock levels, could input and process orders as well as outputting the picklists and routes for the warehouse.  "
                    />
                    <Paragraph 
                        text="Unfortunately for a business which delivered fruit, snacks and drinks to offices, covid was particularly devastating. In a mutually beneficial agreement, I left the company during lockdown to join a former employee's new agency."
                    />
                </Accordian>
         
                <Accordian title="AppLaunch" small={true} indent="ml-6">
                    <Paragraph 
                        text="Applaunch was looking to expand and I was hired to make the API's and web related content for their native apps.  While we were a small company we picked up several clients in a matter of months helping small businesses with their online needs."
                    />
                    <Paragraph 
                        text="After working as a solo dev it was refreshing to work in collaboration with other developers, even if we all had our own areas of expertise. 
                        As well as building multiple API's to handle a multitude of tasks, such as single sign-on, payments and chat functionality, an ever present request was a portal so that the client had a single place to view data and make updates to."
                    />
                    <Paragraph 
                        text="My preferred way to handle this was Laravel Nova and I mostly enjoyed my experience with it.  
                        The components are written in Vue and it's designed to consume a Laravel backend so it was a natural fit.  
                        This was also around the time the Laravel ecosystem introduced me to Tailwind which I took to immediately."
                    />
                    <Paragraph 
                        text="Due to a blossoming partnership between AppLaunch and Morrow (a React Native specialist) I was encouraged to switch from Vue to React for a project. Vue 3 had just been released and I was initially a little disappointed not to spend longer with it but I quickly found a love for React."
                    />
                    <Paragraph 
                        text="So much so, that when AppLaunch and Morrow merged, and they chose to phase Laravel out of their teck stack for Supabase, I decided to leave for a React role."
                    />
                </Accordian>

                <Accordian title="Sopheon" small={true} indent="ml-6">
                    <Paragraph 
                        text="I had a friend at Sopheon who sold the idea of working there to me.  
                        They were looking to replace a frontend developer and needed someone who specialised in React.  
                        I was keen to join in a frontend capacity but also stressed my full stack credentials if needed."
                    />
                    <Paragraph 
                        text="As it turned out, my first ticket which was labelled as a frontend bug, was actually an issue with a package being misused on the backend. 
                        From that ticket onwards my experience with Laravel continued to prove useful, especially as both of our main Laravel developers left shortly after I arrived."
                    />
                    <Paragraph 
                        text="It was a natural decision for me to fill in and even after we hired a new backend developer I continued to spread my work across Laravel and React."
                    />
                    <Paragraph 
                        text="When I joined Sopheon the codebase was in urgent need of updating. It was still running Laravel 5.6, with an equally outdated Docker environment and frontend.  While the product has now been abandoned I'm still proud of the role I played in bringing the code and environments up to date."
                    />
                    {/* <Paragraph 
                        text="Sopheon is the biggest company I've worked for and I was initially worried my role would be more rigid than I was used to.  However I quickly found out that my natural willingness to volunteer and offer my opinion, meant my role quickly evolved."
                    /> */}
                </Accordian>
                    
            </div>
     
            <div>
                <SubTitle title="CV" small={true} indent="ml-6" />
                <div className="text-zinc-700 mb-3 max-w-prose md:text-lg mx-auto">
                    You can view and download my CV from <a href="https://d1fftu7568zsov.cloudfront.net/simon_new_cv_portfolio_version.pdf" className="font-bold text-orange-500"> here </a> if you wish.
                </div>
            </div>

        </div>
    );
}