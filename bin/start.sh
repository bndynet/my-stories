#!/bin/bash
source ./bin/vars.sh

selected_lib_names=()
selected_lib_paths=()
selected_lib_colors=()

chk_selection() {
  # If no choice
  if [[ ${#selected_lib_names[@]} -eq 0 ]]; then
    echo "No libraries selected. Exiting."
    exit 0
  fi
}

# Prompt user to select libraries
echo "Choose libraries you want to start:"
PS3="Enter the number of your choice or Space to confirm: "
select lib_name in "${lib_names[@]}"; do
  # Press Space to confirm
  if [ -z "$lib_name" ]; then
    echo "You selected: ${selected_lib_names[@]}"
    break 2
  elif [[ -n "$lib_name" ]]; then
    # Get path
    for i in "${!lib_names[@]}"; do
      if [[ "${lib_names[$i]}" == "$lib_name" ]]; then
        selected_lib_names+=("$lib_name")
        selected_lib_paths+=("${lib_paths[$i]}")
        selected_lib_colors+=("${colors[$i]}")
        break
      fi
    done
  else
    echo "Invalid selection. -${lib_name}- Please try again."
  fi
done

chk_selection

# Generate command

# Add npm link commands
cmd="npm link ${selected_lib_paths[@]} && "

# Prepare library-specific npm start commands
prefix_commands=""
for ((i = 0; i < ${#selected_lib_names[@]}; i++)); do
  prefix_commands+="\"npm start --prefix ${selected_lib_paths[$i]}\" "
done

str_names=""
str_colors=""
len=${#selected_lib_names[@]}
for ((i=0; i<len; i++)); do
  str_names+="${selected_lib_names[$i]},"
  str_colors+="${colors[$i]},"

  #if [[ $i -eq $((length - 1)) ]]; then
    # last item
  #fi
done

# Add concurrently command
cmd+="concurrently --pad-prefix -c ${str_colors}gray -n ${str_names}storybook $prefix_commands\"npm run storybook\""


#echo $cmd

# Execute the generated command
eval $cmd
