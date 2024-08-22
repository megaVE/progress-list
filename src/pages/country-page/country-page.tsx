import { useParams } from 'react-router-dom';

interface CountryPageProps {}

export function CountryPage({}: CountryPageProps) {
    const { tag } = useParams();

    return <>{tag}</>;
}
