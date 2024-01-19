/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState, MouseEvent, ChangeEvent } from 'react'
import Cookies from 'js-cookie';
import { useQuery, useQueryClient } from 'react-query';
import { userContext } from '../context/userContext';
import { getAllUsers, deleteUser, updateUser } from '../services/admin';
import { IUser } from '../interfaces';
import Loader from '../components/Loader';

export default function ManageUsers() {
    const { user } = useContext(userContext);
    const queryClient = useQueryClient();
    const token = Cookies.get('accessToken');
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const getUsers = async () => await getAllUsers(token ?? '');
    const { data, isError, isLoading } = useQuery('users', getUsers);

    // if (isSuccess) console.log(data);

    const editUserRole = async () => {
        try {
            await updateUser(selectedUser?.id || 0, token ?? '', selectedUser as IUser);
            await queryClient.invalidateQueries('users');
        } catch(error: any) {
            alert('Failed to update user role: ' + error.message);
        } finally {
            setSelectedUser(null);
            setShowEditModal(false);
        }
    };

    const toggleModal = (e: MouseEvent<HTMLElement>) => {
        const modalContent = document.querySelector('.modal-content') as HTMLDivElement;
        const target = e.target as HTMLElement;
    
        if (!modalContent.contains(target) || target.classList.contains('close-modal')) {
            setShowEditModal(false);
        }
    }

    const hideUserAfterDelete = (id: number) => {
        const element = document.querySelector(`[data-id="${id}"]`) as HTMLDivElement;
        element.style.display = 'hidden';
    };

    const changeRole = (e: ChangeEvent<HTMLSelectElement>) => {
        const role = (e.target as HTMLSelectElement).value;
        setSelectedUser((oldUser) => {
            const updatedUser = { ...oldUser, role } as IUser;
            return { ...updatedUser };
        });
    }

    return (
        <>
            <div className={`modal-container absolute left-0 top-0 z-[100] w-screen h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center transition-all ${
                showEditModal ?
                'opacity-100 visible pointer-events-auto' :
                'opacity-0 invisible pointer-events-none'
            }`} onClick={toggleModal}>
                <div className="modal-content relative modal-card flex h-max w-[95%] max-w-[500px] px-5 py-10 md:px-10 flex-col items-center rounded-lg shadow-lg bg-white">
                    <i className="close-modal fas fa-times-circle absolute top-3 right-3 cursor-pointer text-xl" onClick={() => setShowEditModal(false)}></i>
                    <div className="w-full h-max flex flex-col">
                        <label htmlFor="role" className="inline-block mb-2">
                            Edit user role
                        </label>
                        <select
                            name="role"
                            id="role"
                            onChange={changeRole}
                            value={selectedUser?.role}
                            defaultValue={selectedUser?.role}
                            className="w-full p-2.5 border-2 border-slate-400 rounded-md"
                        >
                            <option value="admin">admin</option>
                            <option value="company">company</option>
                            <option value="user">user</option>
                        </select>
                    </div>
                    <button
                        className="self-center bg-blue-500 text-white    p-3 rounded-md w-full max-w-[15rem] mt-6 cursor-pointer flex items-center justify-center"
                        onClick={editUserRole}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="w-screen h-full min-h-screen flex flex-col items-center pt-[10vh] md:pt-[12vh]">
                <div className="w-full max-w-[1280px] h-full p-4 flex flex-col items-center">
                    {
                        (!isLoading && data?.filter(usr => user?.id != usr.id).length == 0) || isError ? (
                            <div className="w-full h-[50vh] flex justify-center items-center">
                                <p className="text-base text-slate-700">
                                    {
                                        isError ?
                                        'An error occured while fetching users! Please try again later.' :
                                        'There are no users here at this moment!'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="w-full max-w-[600px]">
                                <h1 className="text-lg font-bold mb-6">Users</h1>
                                {
                                    isLoading ? (
                                        <div className="w-full h-[50vh] flex justify-center items-center">
                                            <Loader loading={isLoading} color='bg-blue-500' />
                                        </div>
                                    ) :
                                    (
                                        <div className="w-full h-full flex flex-col items-center">
                                            {
                                                data?.filter(usr => user?.id != usr.id)
                                                .map(rec => {
                                                    return (
                                                        <div key={rec.id} className="w-full h-max shadow-lg rounded-md mb-3 p-3 md:p-5 flex items-center group" data-id={rec.id}>
                                                            <i className="fas fa-user-circle text-gray-400 text-5xl md:text-6xl mr-3"></i>
                                                            <div className="flex flex-col xs:flex-row xs:justify-between w-[calc(100%-50px)]">
                                                                <div className="flex flex-col">
                                                                    <p className="text-xs sm:text-sm text-slate-700 mb-1">
                                                                        <span className="font-bold">Username: </span>{ rec.username }
                                                                    </p>
                                                                    <p className="text-xs sm:text-sm text-slate-700 mb-1">
                                                                        <span className="font-bold">Email: </span>{ rec.email }
                                                                    </p>
                                                                    <p className="text-xs sm:text-sm text-slate-700 mb-1">
                                                                        <span className="font-bold">Role: </span>{ rec.role }
                                                                    </p>
                                                                    <p className="text-xs sm:text-sm text-slate-700">
                                                                        <span className="font-bold">Created: </span>{
                                                                            new Date(rec.createdAt as string).toISOString().split('.')[0].replace('T', ' ')
                                                                        }
                                                                    </p>
                                                                </div>
                                                                {/* <div className="flex flex-col">
                                                                    
                                                                </div> */}
                                                                <div className="flex mt-2 xs:mt-0 xs:self-end items-center md:hidden md:group-hover:inline-block">
                                                                    <i className="fas fa-pen text-slate-700 mr-4 cursor-pointer" onClick={() => {
                                                                        setSelectedUser(rec);
                                                                        setShowEditModal(true);
                                                                    }}></i>
                                                                    <i className="fas fa-trash text-red-400 cursor-pointer" onClick={async () => {
                                                                        try {
                                                                            await deleteUser(rec.id ?? 0, token ?? '');
                                                                            hideUserAfterDelete(rec.id as number);
                                                                            await queryClient.invalidateQueries('users');
                                                                        } catch(error: any) {
                                                                            alert('Failed to delete user: ' + error.message);
                                                                        }
                                                                    }}></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
