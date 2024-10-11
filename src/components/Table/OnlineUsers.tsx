// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import { MdOutlineRadioButtonChecked } from 'react-icons/md'

// export default function OnlineUsers() {
//   return (
//     <Menu as="div" className="relative inline-block text-center z-auto">
//       <div>
//         <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//           Users
//           <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
//         </MenuButton>
//       </div>

//       <MenuItems
//         transition
//         className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//       >
//         <div className="py-1">
//           <MenuItem>
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
//             >
//               Juanse Mendoza
//             </a>
//           </MenuItem>
//           <MenuItem>
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
//             >
//               William brown
//             </a>
//           </MenuItem>
//           <MenuItem>


//             <a
//               href="#"
//               className="flex  gap-x-10 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
//             >

//               <MdOutlineRadioButtonChecked />

//               Sophia wilson
//             </a>
//           </MenuItem>
//           <form action="#" method="POST">
//             <MenuItem>
//               <button
//                 type="submit"
//                 className="block w-full px-4 py-2  text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
//               >
//                 Olivia miller
//               </button>
//             </MenuItem>
//           </form>
//         </div>
//       </MenuItems>
//     </Menu>
//   )
// }

import { Avatar, AvatarGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { ExplorerItem } from "../Navbar/ExplorerItem";
import { SocketContext } from "../../Providers";
import { capitalizeFirstLetter } from "../../Utils";
import Modal from "../common/Modal";
import { PageTitle } from "../common/PageTitle";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


interface Users {
  id: string
  name: string,
  lastName: string
  role: {
    name: string
  }
}

export default function OnlineUsers() {


  const socket = useContext(SocketContext)
  const [getUsers, setGetUsers] = useState<Users[]>([])



  // console.log('LO QUE ME TIRA DE SOCKET', socket?.socket.)
  useEffect(() => {
    socket?.socket?.on('usersOnline', (usersOnline: unknown[]) => {
      console.log('USUARIOS ONLINE', usersOnline)
      setGetUsers(usersOnline as Users[])
    })

  })
  const users = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026302d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
    "https://i.pravatar.cc/150?u=a04258114e29026708c",
  ];

  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setOpenPopoverIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenPopoverIndex(null);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false)



  return (
    <AvatarGroup


      isBordered

      max={3}

      renderCount={(count) => (

        <><Avatar
          size="sm" className="z-50"
          classNames={{
            base: "bg-slate-50 w-5 h-5 p-3",


          }}

          onClick={() => setIsOpen(true)}
          name={`+${count}`}

        />



          <Modal isOpen={isOpen} setIsOpen={setIsOpen}  >
            
            <div className="p-5 flex flex-col max-h-60 overflow-y-auto ">
              <PageTitle title='Users Online' />
              {getUsers.map((user, index) => (



                <ExplorerItem
                  title={`${user.name} ${user.lastName}`} description={user.role.name}

                  OnelineIcon={<Avatar

                    fallback={
                      <FaUser></FaUser>
                    }
                    classNames={{
                      base: " bg-slate-50",

                    }}
                    color='success' size="sm" className="m-3 text-slate-300" />} to={`/profile/${user.id}`} id={""} />



              ))}
            </div>
          </Modal></>
        // <Dropdown >
        //   <DropdownTrigger>
        //     <Avatar
        //       name={`+${count}`}
        //     />
        //   </DropdownTrigger>
        //   <DropdownMenu
        //     itemClasses={{
        //       base: [
        //         "data-[hover=true]:bg-default-0",

        //       ],
        //     }}

        //     className="m-0  ">
        //     <DropdownItem
        //     >
        //       <div className="p-5 flex flex-col max-h-60 overflow-y-auto ">

        //         {getUsers.map((user, index) => (


        //           <ExplorerItem key={index} to={""} id={""} title={`${user.name} ${user.lastName}`} description={user.role.name}

        //             OnelineIcon={<Avatar
        //               classNames={{
        //                 base: "bg-slate-200",

        //               }}
        //               color='success' size="sm" className="m3 " />}
        //           />


        //           // <div key={index} className="flex items-center mb-2">
        //           //   <Avatar src={user} />
        //           //   <h1 className="ml-2">Michael Jordan </h1>
        //           // </div>
        //         ))}
        //       </div>
        //     </DropdownItem>
        //   </DropdownMenu>
        // </Dropdown>
      )}
    >
      {getUsers.map((user, index) => (
        <Popover
          key={index}
          isOpen={openPopoverIndex === index} // Controla si el popover está abierto
          onOpenChange={(open) => open || setOpenPopoverIndex(null)} // Cierra el popover al hacer clic afuera
        >
          <PopoverTrigger>
            <div
              onMouseEnter={() => handleMouseEnter(index)} // Abrir popover en hover
              onMouseLeave={handleMouseLeave} // Cerrar popover cuando se quita el hover
            >

              <Link

                to={`/admin/users/profile/${user.id}`}>
                <Avatar
                  className="text-slate-300"

                  color='success' fallback={
                    <FaUser></FaUser>
                  } classNames={{
                    base: "bg-slate-50 w-5 h-5 p-3",


                  }} />

              </Link>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            {(titleProps) => (
              <div className="px-1 py-2">
                <h3 className="text-small font-bold" {...titleProps}>
                  {`${user.name} ${user.lastName}`}
                </h3>
                <div className="text-tiny">{capitalizeFirstLetter(user.role.name)}</div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      ))}
    </AvatarGroup>
  );
}





// export default function App() {
//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button
//           variant="bordered"
//         >
//           Open Menu
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu
//         aria-label="Action event example"
//         onAction={(key) => alert(key)}
//       >
//         <DropdownItem key="new">New file</DropdownItem>
//         <DropdownItem key="copy">Copy link</DropdownItem>
//         <DropdownItem key="edit">Edit file</DropdownItem>
//         <DropdownItem key="delete" className="text-danger" color="danger">
//           Delete file
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }