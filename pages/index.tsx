import React from "react";
import NavBar from "../app/components/navbar";
import "../firebase/client";
import styles from "../app/styles/index.module.css";
import MatchCard from "../app/components/match_card";

export async function getServerSideProps(context) {
	const protocol = process.env.NODE_ENV ? "http" : "https";

	const response = await fetch(
		`${protocol}://${context.req.headers.host}/api/matches`
	);
	const data = await response.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			matches: data.matches,
		},
	};
}

const Home = ({ matches }) => {
	return (
		<React.Fragment>
			<NavBar />
			<main className={styles.main}>
				<h2 className={styles.title}>¡Partidos de Hoy!</h2>
				<section className={styles.cards_container}>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={true}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={false}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={false}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={true}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={false}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={true}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={false}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={false}
					/>
					<MatchCard
						hour="7:00 PM"
						competition="Champions League"
						homeTeamName="FC Barcelona"
						homeTeamImageUrl="/images/barcelona.png"
						awayTeamImageUrl="/images/real-madrid.png"
						awayTeamName="Real Madrid"
						like={true}
					/>
				</section>
			</main>
		</React.Fragment>
	);
};
export default Home;
