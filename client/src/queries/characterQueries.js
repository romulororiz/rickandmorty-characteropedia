import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
	query getCharacters(
		$name: String!
		$status: String!
		$gender: String!
		$species: String!
	) {
		characters(
			name: $name
			status: $status
			gender: $gender
			species: $species
		) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				status
				species
				gender
				origin {
					name
					url
				}
				location {
					name
					url
				}
				image
				episode
			}
		}
	}
`;

export { GET_CHARACTERS };
