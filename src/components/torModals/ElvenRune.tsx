// @ts-nocheck
import React, { FC }  from 'react';

interface ElvenRuneProps {
	style?: { [key as string]: string }
}

const ElvenRune: FC<ElvenRuneProps> = (props) => {
	return (
		<span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.0"
				width="30"
				height="30"
				viewBox="4.5 12 20 35"
			>
			  <defs />
			  <g>
				<path
					d="M 24.684063,22.056747 C 24.684046,22.568755 24.566713,23.166088 24.332063,23.848747 C 24.118713,24.510087 23.80938,25.192753 23.404063,25.896747 C 23.020047,26.600751 22.572048,27.304751 22.060063,28.008747 C 21.548049,28.691416 21.004049,29.299415 20.428063,29.832747 C 19.852051,30.366081 19.265385,30.803414 18.668063,31.144747 C 18.070719,31.464746 17.49472,31.624746 16.940063,31.624747 C 16.769387,31.624746 16.577387,31.55008 16.364063,31.400747 C 16.150721,31.251413 15.948054,31.091414 15.756063,30.920747 C 15.521388,30.707414 15.286722,30.472747 15.052063,30.216747 L 16.876063,28.136747 C 17.23872,28.414083 17.622719,28.648749 18.028063,28.840747 C 18.433385,29.032749 18.860052,29.128749 19.308063,29.128747 C 19.756051,29.128749 20.161384,29.011416 20.524063,28.776747 C 20.90805,28.542083 21.228049,28.254083 21.484063,27.912747 C 21.740049,27.550084 21.942715,27.155417 22.092063,26.728747 C 22.241382,26.280752 22.316048,25.864752 22.316063,25.480747 C 22.316048,24.81942 22.188048,24.14742 21.932063,23.464747 C 21.676049,22.760755 21.324049,22.120756 20.876063,21.544747 C 20.42805,20.968757 19.894717,20.499424 19.276063,20.136747 C 18.657385,19.774091 17.985386,19.592758 17.260063,19.592747 C 16.833387,19.592758 16.396054,19.688758 15.948063,19.880747 C 15.500055,20.051425 15.052055,20.275424 14.604063,20.552747 C 14.17739,20.808757 13.772057,21.096757 13.388063,21.416747 C 13.004057,21.736756 12.662724,22.035423 12.364063,22.312747 L 12.364063,41.288747 C 11.830725,41.736736 11.222726,42.195402 10.540063,42.664747 C 9.8787272,43.134068 9.2387279,43.486068 8.6200629,43.720747 C 8.7267284,43.251401 8.8120616,42.494069 8.8760629,41.448747 C 8.9400615,40.403404 8.9827281,39.198072 9.0040629,37.832747 C 9.0467281,36.467408 9.0680614,34.99541 9.0680629,33.416747 C 9.0893947,31.859413 9.1000613,30.323414 9.1000629,28.808747 L 9.1000629,22.344747 C 9.1000613,21.704756 8.9827281,21.15009 8.7480629,20.680747 C 8.5133953,20.211424 8.0973957,19.859425 7.5000629,19.624747 C 7.8200626,19.347425 8.1720623,19.048759 8.5560629,18.728747 C 8.9400615,18.40876 9.3453944,18.12076 9.7720629,17.864747 C 10.198727,17.587427 10.625393,17.352761 11.052063,17.160747 C 11.500059,16.947428 11.937392,16.808761 12.364063,16.744747 L 12.364063,21.320747 C 12.918724,20.76609 13.452057,20.243424 13.964063,19.752747 C 14.497389,19.262092 15.052055,18.835426 15.628063,18.472747 C 16.204054,18.110093 16.82272,17.83276 17.484063,17.640747 C 18.145386,17.427427 18.902718,17.320761 19.756063,17.320747 C 20.33205,17.320761 20.90805,17.459427 21.484063,17.736747 C 22.081382,17.99276 22.614714,18.34476 23.084063,18.792747 C 23.55338,19.240759 23.93738,19.752758 24.236063,20.328747 C 24.534713,20.883424 24.684046,21.459423 24.684063,22.056747"
					{...props} />
			  </g>
			</svg>
		</span>
	);
}

export default ElvenRune;