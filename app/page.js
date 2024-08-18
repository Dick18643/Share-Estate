import React from 'react';
import './Home.css'; // Import the CSS file for animations

export default function Home() {
  // Define the servicesData array here
  const servicesData = [
    {
      icon: '💬',
      title: 'Booking Calls',
      description: 'Helps scheduling and organizing phone or face time appointments, to discuss, plan, or finalize details with clients or partners.',
    },
    {
      icon: '🔒',
      title: 'Secure Transaction',
      description: 'Ensures data integrity and user trust through cryptographic encryption, decentralized consensus, and smart contract validation.',
    },
    {
      icon: '🎯',
      title: 'Target Driven',
      description: 'Results-oriented professional with a relentless focus on achieving targets and driving success. Passionate about setting and surpassing goals, leveraging data-driven strategies to deliver impactful outcomes in every project.',
    },
    {
      icon: '👥',
      title: 'Certified Real Estate/Properties',
      description: 'Clear Certification using Non-Fungible Tokens (NFTs) are provided with a save track in terms and policies.',
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <header className="flex justify-between p-4 bg-white">
        <div className="flex items-center space-x-2"></div>
      </header>

      {/* Hero Section */}
      <section className="hero-section flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://assets.everspringpartners.com/fe/06/f23661be455e97d009c6ae418995/real-estate-finance.jpg')" }}>
        <div className="text-center text-white bg-black bg-opacity-50 p-60 rounded-lg fade-in">
          <h2 className="text-4xl font-bold mb-4 fade-in-text">Don't wait to buy real estate, buy real estate and wait</h2>
          <p className="text-lg mb-6 fade-in-text">"90% of all millionaires become so through owning real estate." - Andrew Carnegie</p>
          <div className="flex items-center space-x-2 fade-in-input">
            <input type="text" placeholder="Enter your post code or address here" className="px-10 py-2 w-64 rounded-lg" />
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black rounded-lg">Search</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="services-container p-10">
        <h2 className="text-3xl font-bold text-center mb-4">What do we offer</h2>
        <p className="text-center mb-6">
          We make real estate transactions safer, more transparent, and more effective. We may also improve trust, expand market participation, and expedite procedures.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesData.map((service, index) => (
            <div className="service-card p-4 bg-white rounded-lg shadow-md text-center" key={index}>
              <div className="text-4xl mb-2">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">See More</button>
        </div>
      </div>

      {/* Why Work with Us Section */}
      <section className="why-working-section py-10 bg-gray-100">
        <div className="container mx-auto flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <div className="image-container">
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/657b29edf09ae8354c4debba/Real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is/960x0.jpg?height=474&width=711&fit=bounds"
                alt="Office"
                className="office-image rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="mb-4">
              Partnering with us means investing in property with transparency and efficiency. We leverage blockchain technology to tokenize real estate, allowing you to buy and sell shares without intermediaries, ensuring lower costs, faster transactions, and greater control. Our platform offers you direct access to high-quality properties and seamless, secure transactions, transforming how you invest in real estate.
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li className="mb-2">
                <span className="font-bold text-blue-500">1</span> We have weekly news and updates with customer/client offers.
              </li>
              <li className="mb-2">
                <span className="font-bold text-blue-500">2</span> Custom smart contracts that expedite property transactions, reducing costs and time.
              </li>
              <li className="mb-2">
                <span className="font-bold text-blue-500">3</span> Tokenization NFTs allow fractional ownership accessible to a broader range of investors.
              </li>
            </ul>
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Read More</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section bg-gray-800 text-white py-10">
  <div className="container mx-auto flex flex-wrap">
    <div className="w-full md:w-1/4 p-4">
      <img
        src="Share Estate.png" // Replace logo URL
        alt="Logo"
        className="mb-4"
      />
      <h4 className="text-lg font-bold">Share Estate</h4>
      <p>Your Modern Way of Investing in Real Property and Estate Digitally</p>
    </div>
    <div className="w-full md:w-1/4 p-4">
      <h5 className="text-lg font-bold mb-4">Services</h5>
      <ul>
        <li className="mb-2">Booking</li>
        <li className="mb-2">Selling</li>
      </ul>
    </div>
    <div className="w-full md:w-1/4 p-4">
      <h5 className="text-lg font-bold mb-4">About</h5>
      <ul>
        <li className="mb-2">Our Story</li>
        <li className="mb-2">Blog</li>
      </ul>
    </div>
    <div className="w-full md:w-1/4 p-4">
      <h5 className="text-lg font-bold mb-4">Follow us</h5>
      <ul className="flex space-x-4">
        <li>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              className="w-6 h-6"
            />
          </a>
        </li>
        <li>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-6 h-6"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>

    </div>
  );
}
