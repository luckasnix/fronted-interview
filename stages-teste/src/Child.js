import React, { useState, useEffect } from "react";
import { Box, Loader, getTheme } from "styled-minimal";

const Child = ({ index, color = "yellow", duration, onExpired }) => {
  // Este estado denota se o tempo foi ou não expirado
  const [isExpired, setIsExpired] = useState(false);
  const { colors } = getTheme();

  // Contador de tempo baseado na prop "duration" recebida
  useEffect(() => {
    const durationTimer = setTimeout(() => {
      setIsExpired(true);
      onExpired(index);
    }, duration);

    // Quando desmontado, o contador de tempo deve ser limpo
    return () => {
      clearTimeout(durationTimer);
    };
  }, []);

  return (
    <Box
      alignItems="center"
      bg={isExpired ? colors[color] : 'transparent'}
      border={`2px solid ${colors[color]}`}
      borderRadius="8px"
      marginBottom="8px"
      display="flex"
      height={128}
      justifyContent="center"
    >
      {!isExpired && <Loader color={colors[color]} size={48} />}
    </Box>
  );
};

export default Child;
