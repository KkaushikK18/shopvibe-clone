import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

export const CategoryCard = ({ title, image, link }: CategoryCardProps) => {
  return (
    <Link to={link}>
      <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-primary mt-1">Shop now</p>
        </div>
      </div>
    </Link>
  );
};
