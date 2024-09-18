'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { RootState } from '@/lib/store'
import { addPlayer, removePlayer, updatePlayer } from '@/lib/teamSlice'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { PlayerFormComponent, PlayerFormData } from '@/components/shared/player-form-component'

type Player = PlayerFormData & { id: string }

export default function TeamPage() {
  const { id } = useParams()
  const team = useSelector((state: RootState) => 
    state.teams.teams.find(t => t.id === id)
  )
  const dispatch = useDispatch()

  const [filter, setFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)

  const [hasCaptain, setHasCaptain] = useState(false)
  const [hasViceCaptain, setHasViceCaptain] = useState(false)

  useEffect(() => {
    if (team) {
      setHasCaptain(team.players.some(p => p.isCaptain))
      setHasViceCaptain(team.players.some(p => p.isViceCaptain))
    }
  }, [team])

  if (!team) return <div className="flex items-center justify-center h-screen text-2xl">Team not found</div>

  const filteredPlayers = team.players.filter(player => 
    filter === 'all' ? true : player.role === filter
  )

  const handleSubmit = (data: PlayerFormData) => {
    if (editingPlayer) {
      dispatch(updatePlayer({
        teamId: team.id,
        player: { ...data, id: editingPlayer.id }
      }))
      setEditingPlayer(null)
    } else {
      dispatch(addPlayer({
        teamId: team.id,
        player: { ...data, id: Date.now().toString() }
      }))
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{team.name}</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Players</SelectItem>
            <SelectItem value="Batsman">Batsman</SelectItem>
            <SelectItem value="Bowler">Bowler</SelectItem>
            <SelectItem value="All Rounder">All Rounder</SelectItem>
            <SelectItem value="WK">Wicket Keeper</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Player
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingPlayer ? 'Edit Player' : 'Add New Player'}</DialogTitle>
            </DialogHeader>
            <PlayerFormComponent
              onSubmit={handleSubmit}
              initialData={editingPlayer || undefined}
              hasCaptain={hasCaptain}
              hasViceCaptain={hasViceCaptain}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center justify-between">
                <span>{player.name}</span>
                <span className="text-sm font-normal">
                  {player.isCaptain ? '(C)' : player.isViceCaptain ? '(VC)' : ''}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-500">{player.name[0]}</span>
                </div>
                <p className="text-lg font-semibold mb-2">{player.role}</p>
                <p className="text-sm text-gray-500">
                  {player.isCaptain ? 'Captain' : player.isViceCaptain ? 'Vice-Captain' : 'Player'}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setEditingPlayer(player)
                  setIsDialogOpen(true)
                }}
                className="flex-1 mr-2"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  dispatch(removePlayer({ teamId: team.id, playerId: player.id }))
                }}
                className="flex-1 ml-2"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}