import Subtitle from './atoms/Subtitle';
import { Title } from './atoms/Title';

type Props = {
    user: any;
}

export default function MusicianCard({user}: Props) {

    console.log("Im here", user)
  return (
    <>
    <div>
        <div className='flex gap-1'>
        <Title variant="red" title={user.name} />
        <Title variant="red" title={user.lastname} />
        </div>
        <p>{user.email}</p>
        {user.myInstruments.map((instrument: any, index: number) => (
        <Subtitle key={index} variant="default" subtitle={instrument.name} />
        ))}
    </div>
    </>
  )
}