// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[#83ba67] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Texto de info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-2">
            ¿Quieres recibir más información?
          </h2>
          <p className="text-sm">
            Envianos un mensaje y te atenderemos a la brevedad.
          </p>
        </div>

        <form
          id="contact"
          action="https://formsubmit.co/yamirngifo18@gmail.com"
          method="POST"
          className="flex flex-col  w-full sm:w-auto gap-2 mt-4 md:mt-0"
        >
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="p-3 rounded-md text-gray-800 w-full sm:w-72 focus:outline-none border border-white"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Chat Here"
            required
            className="w-full rounded-md resize-none text-gray-800 border border-white p-3 sm:w-72 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-white text-[#619746] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Contáctanos
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-sm opacity-80">
        &copy; 2025 Chefcito. Todos los derechos reservados.
      </div>
    </footer>
  );
}
