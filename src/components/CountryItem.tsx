type CountryItemProps = {
  country: string;
  emoji: string;
};

function CountryItem({ country, emoji }: CountryItemProps) {
  return (
    <li
      className="h-14 m-4 flex items-center justify-center hover:shadow-lg transition-all duration-100
	  ease-linear cursor-pointer text-lg  rounded-lg bg-colorDark-2 "
    >
      <div className="flex gap-2">
        <p>{emoji}</p>
        <p>{country}</p>
      </div>
    </li>
  );
}

export default CountryItem;
