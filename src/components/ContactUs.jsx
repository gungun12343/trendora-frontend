export const ContactUs = () => {
    return (
        <div className="md:mt-24 mt-20 p-5 flex items-center justify-center flex-col">
            <h2 className="text-center md:text-3xl text-xl font-bold">Contact Us</h2>

            <div className="flex flex-col gap-3 md:w-[60%] w-[80%] mt-5">
                <p className="text-lg font-semibold">We’d love to hear from you! Whether you have questions, feedback, or need assistance with your order, our team is here to help.👋</p>

                <div>
                    <p className="font-bold">Customer support hours</p>
                    <p>Monday-Friday: 9 AM - 6 PM</p>
                    <p>Saturday: 10 AM - 4 PM</p>
                    <p>Sunday: Closed</p>
                </div>

                <div>
                    <p className="font-bold">Reach Out to us</p>
                    <p>Email: trendoraSupport@gmail.com</p>
                    <p>Phone: +91 91234 56789</p>
                </div>
            </div>
        </div>
    )
}