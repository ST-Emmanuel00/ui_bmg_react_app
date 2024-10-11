export const Footer = () => {
    return (
        <footer className="text-center py-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2024, Made with ❤️ by Disruptive
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0 sm:block hidden">
                <a href="#about-disruptive" className="mr-4 hover:underline">About Disruptive</a>
                <a href="#about-lar" className="hover:underline">About BMG</a>
            </div>
        </footer>
    );
};
