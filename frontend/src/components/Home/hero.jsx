function Hero() {
    return (
        <section className="px-2 pt-32 bg-white md:px-0 w-screen">
    <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center">
            <span className="block">This is the <span className="block mt-1 text-purple-500 lg:inline lg:mt-0" data-primary="purple-500">Hero Component</span></span>
        </h1>
        
    </div>
    <div className="container items-center max-w-4xl px-5 mx-auto mt-16 text-center">
        <img src="https://cdn.devdojo.com/images/november2020/hero-image.png" alt="Hero" />
    </div>
</section>
    )
}

export default Hero
