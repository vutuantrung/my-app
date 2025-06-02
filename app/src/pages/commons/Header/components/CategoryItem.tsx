export const CategoryItem = ({ name, href }: { name: string; href: string }) => {
    return (
        <a href={href} className="item channel_item">
            {name}
        </a>
    );
};
