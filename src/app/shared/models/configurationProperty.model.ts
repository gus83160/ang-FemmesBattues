// import {Driver} from "./driver";
//
// export class ConfigurationProperty {
//
// 	public id: string;
// 	public key: string;
// 	public value: string;
// 	public driver: Driver;
//
// 	constructor(key: string, value: string) {
// 		this.key = key;
// 		this.value = value;
// 	}
//
// }
//
// export enum ConfigurationKey {
//
// 	driver_cpam_mini = "driver_cpam_mini",
// 	driver_remise_cpam = "driver_remise_cpam",
// 	driver_taux_partiel_cpam = "driver_taux_partiel_cpam"
//
// }
//
// export class ConfigurationProperties {
//
// 	static configurationPropertiesIsValid(configurationProperties: ConfigurationProperty[]):boolean {
// 		if (configurationProperties == null || configurationProperties.length === 0)
// 			return false;
//
// 		return configurationProperties.find(conf => conf.key == ConfigurationKey.driver_cpam_mini) != undefined &&
// 			configurationProperties.find(conf => conf.key == ConfigurationKey.driver_cpam_mini) != undefined &&
// 			configurationProperties.find(conf => conf.key == ConfigurationKey.driver_cpam_mini) != undefined;
// 	}
//
// }
