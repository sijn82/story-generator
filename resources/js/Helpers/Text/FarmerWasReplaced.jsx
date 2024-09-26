export const start_maze = `
    def start_maze():
        available_routes = calculate_initial_routes()
        coords_dictionary = dict()
        treasure_found = False
        
        for initial_direction in available_routes:
            if not treasure_found:
                treasure_found = navigate_route(initial_direction, coords_dictionary, treasure_found)
`
export const navigate_route = `
    def navigate_route(initial_direction, coords_dictionary, treasure_found):
        route_taken = []
        navigating_route = True
        # just in case we started on the treasure
        if get_entity_type() == Entities.Treasure:
            # let's grab it!
            harvest()
            treasure_found = True
            return treasure_found
            
        move(initial_direction)
        route_taken.append(initial_direction)
        current_direction = initial_direction
        
        while navigating_route:
            # is the treasure beneath us before we move again
            if get_entity_type() == Entities.Treasure:
                # let's grab it!
                harvest()
                treasure_found = True
                return treasure_found
            else:
                (current_direction, navigating_route) = next_step(current_direction, coords_dictionary, route_taken, navigating_route)

`

export const next_step = `
    def next_step(current_direction, coords_dictionary, route_taken, navigating_route):

        # if this is not our first time at these coords, get one of the remaining options
        x, y = get_pos_x(), get_pos_y()
        if (x,y) in coords_dictionary:
            new_direction = coords_dictionary[(get_pos_x(), get_pos_y())].pop(0)
            current_direction = new_direction
        else:
            # calculate the options for the first time
            alternative_directions_available = calculate_directions_available(current_direction)
            if len(alternative_directions_available) > 0:
                coords_dictionary[(get_pos_x(), get_pos_y())] = alternative_directions_available
                
        # continue in current direction if we can
        if continue_in_current_direction(current_direction, route_taken):
            return (current_direction, navigating_route)
        # take another available direction
        elif len(alternative_directions_available) > 0:
            # grab the first direction in the list and then remove it as an option
            new_direction = coords_dictionary[(get_pos_x(), get_pos_y())].pop(0)
            move(new_direction)
            route_taken.append(new_direction)
            return (new_direction, navigating_route)
        # if we can't move forward or take a different branch, we're either at the treasure
        # or we need to head back
        else:
            # did we find the treasure?
            if get_entity_type() == Entities.Treasure:
                # let's grab it!
                harvest()
            else:
                # let's head back to the next branch
                x, y = get_pos_x(), get_pos_y()
                while ((x,y) not in coords_dictionary or len(coords_dictionary[(x,y)]) == 0) and len(route_taken) > 0:
                    x, y = get_pos_x(), get_pos_y()
                    direction = route_taken.pop()
                    # return in the opposite direction
                    if direction == North:
                        move(South)
                    if direction == East:
                        move(West)
                    if direction == South:
                        move(North)
                    if direction == West:
                        move(East)
                    x, y = get_pos_x(), get_pos_y()
                
                if (x,y) in coords_dictionary:
                    # now we should be at a cross roads again so return the new direction
                    new_direction = coords_dictionary[(get_pos_x(), get_pos_y())].pop(0)
                    move(new_direction)
                    route_taken.append(new_direction)
                    return (new_direction, navigating_route)
                else:
                    navigating_route = False
                    return (current_direction, navigating_route)
`

export const calculate_initial_routes = `
    def calculate_initial_routes():
        # check initial available routes
        available_routes = []
        if move(North):
            available_routes.append(North)
            move(South)
        if move(East):
            available_routes.append(East)
            move(West)
        if move(South):
            available_routes.append(South)
            move(North)
        if move(West):
            available_routes.append(West)
            move(East)
        return available_routes
`

export const calculate_directions_available = `
    def calculate_directions_available(current_direction):
        cardinal_directions = [North, East, South, West]
        # remove the current direction
        cardinal_directions.remove(current_direction)
        # also remove the direction we have just come from
        if current_direction == North:
            cardinal_directions.remove(South)
        if current_direction == East:
            cardinal_directions.remove(West)
        if current_direction == South:
            cardinal_directions.remove(North)
        if current_direction == West:
            cardinal_directions.remove(East)
            
        directions_to_remove = []
        # now remove any directions which are blocked by the maze currently
        for direction in cardinal_directions:
            
            if move(direction):
                if direction == North:
                    move(South)
                elif direction == East:
                    move(West)
                elif direction == South:
                    move(North)
                elif direction == West:
                    move(East)
            else:
                directions_to_remove.append(direction)
                
        # directions to remove has to be done outside the for loop or removing the directions shortens the loop
        # and prevents it from iterating over all the values
        for direction in directions_to_remove:
            cardinal_directions.remove(direction)
            
        return cardinal_directions
`