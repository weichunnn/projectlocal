import { useSearch } from '@/lib/search';

export default function searchLogic(businesses) {
  const { search, location, categories } = useSearch();

  const matchesLocation = (business) => location.includes(business.location);
  const matchesSearch = (business) => {
    return (
      business.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      business.name.toLowerCase().includes(search.toLowerCase())
    );
  };
  const matchesCategories = (business) =>
    categories.some((cat) => business.categories.includes(cat));

  const filteredBusinesses = businesses
    .filter(matchesLocation)
    .filter(matchesCategories)
    .filter(matchesSearch);

  return filteredBusinesses;
}
