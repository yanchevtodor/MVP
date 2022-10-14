/**
 * This code needs help.
 */

import { getUserByName, getUserInfractions } from './user-api.js';

/**
 * @param {string} username
 * @returns {Promise.<Object>}
 */
const getReasonForWorstInfractionLinkified = (username) => {	

	return new Promise((resolve) => {
		getUserByName(username, (user) => {
			getUserInfractions(user.id, (result) => {
				// find most recent infraction with most infraction points
				let foundIndex = 0;
				// for (let i = result.length - 1; i >= 0; i--) {
				// 	if (result[i].points > result[foundIndex].points) {
				// 		foundIndex = i;
				// 	}
				// }

				result.forEach((element, index) => {
					if (result[index].points > result[foundIndex].points) {
						foundIndex = index;
					}
				});
	
				// replace urls by links
				resolve(result[foundIndex].reason.replace(
					/\bhttp:\/\/\S+/,
					match => '<a href=' + match + '>' + match + '</a>'
				));
			});
		});
	})
}

/**
 * @param {string} name
 * @returns {Promise.<Object>}
 */
const getReasonForMostRecentInfractionLinkified = (name) => {

	return new Promise((resolve) => {

		getUserByName(name, (user) => {
			getUserInfractions(user.id, (result) => {

				// find most recent infraction
				let foundIndex = result.length - 1
	
				// replace urls by links
				resolve(result[foundIndex].reason.replace(
					/\bhttps:\/\/\S+/,
					match => '<a href=' + match + '>' + match + '</a>'
				));
			});
		});
	})	
}

/**
 * Returns reason of the worst & the most recent user infraction with linkified urls
 * @param {string} username
 * @returns {Promise.<Object>}
 */


// export const getRelevantInfractionReasons = (username) =>
// {
// 	return new Promise((resolve) => {
// 		getReasonForWorstInfractionLinkified(username)
// 		.then((worst) => {
// 			getReasonForMostRecentInfractionLinkified(username)
// 			.then(
// 				(mostRecent) => {
// 				resolve({mostRecent, worst});
// 			});
// 		});
// 	});
// }

export const getRelevantInfractionReasons = async (username) => {
		const mostRecent = await getReasonForWorstInfractionLinkified(username)
		const worst = await getReasonForMostRecentInfractionLinkified(username)
		return({mostRecent, worst});
	
}


