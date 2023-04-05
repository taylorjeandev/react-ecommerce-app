import { Box, Input } from "@chakra-ui/react";
function Search({ value, onChangeData }) {
  return (
    <Box as="div" m={2}>
      <Input
        maxW="400px"
        className="search"
        type="text"
        placeholder="Enter product name"
        value={value}
        onChange={onChangeData}
      />
    </Box>
  );
}

export default Search;
