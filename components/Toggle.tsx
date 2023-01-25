import { Switch } from '@headlessui/react'

export default function Toggle(props:any) {

  return (
    <Switch.Group>
      <div className="flex items-center text-sm">
        <Switch.Label className="mr-4 font-[500] italic">Pay with credit card?</Switch.Label>
        <Switch
          checked={props.state}
          onChange={props.setState}
          className={`${
            props.state ? 'bg-violet-400' : 'bg-gray-200'
          } relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1`}
        >
          <span
            className={`${
              props.state ? 'translate-x-4' : 'translate-x-1'
            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}