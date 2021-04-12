import { BadRequestException, PipeTransform } from '@nestjs/common';
import { channels } from '../form.enums';

export class FormFrequenciesValidation implements PipeTransform {
  readonly maxFrequencyInMHz = 2500
  readonly minFrequencyInMHz = 50

  transform(value: any) {
    if(!this.isFrequenciesValid(value))
      throw new BadRequestException(`${value} is not in ${this.minFrequencyInMHz} .. ${this.maxFrequencyInMHz} MHz`)
    return value
  }

  isFrequenciesValid(frequencies:string[]):boolean{
    const valid = frequencies.every(frequency=>{
      const fr = parseFloat(frequency)
      return fr>this.minFrequencyInMHz && fr<this.maxFrequencyInMHz
    })
    return valid
  }
}

export class ChannelsValidation implements PipeTransform{
  allowedChannels = new Set(Object.values(channels));

  transform(value:any){
    if(!this.isChannelsValid(value))
      throw new BadRequestException(`${value} is not in ${[...this.allowedChannels]}`)
    return value

  }

  isChannelsValid(channels:string[]):boolean{
    const valid = channels.every(channel=>this.allowedChannels.has(channel))
    return valid
  }
}
